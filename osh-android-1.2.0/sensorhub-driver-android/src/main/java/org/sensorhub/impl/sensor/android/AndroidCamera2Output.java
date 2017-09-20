/***************************** BEGIN LICENSE BLOCK ***************************

The contents of this file are subject to the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one
at http://mozilla.org/MPL/2.0/.

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
for the specific language governing rights and limitations under the License.
 
Copyright (C) 2012-2015 Sensia Software LLC. All Rights Reserved.
 
******************************* END LICENSE BLOCK ***************************/

package org.sensorhub.impl.sensor.android;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import net.opengis.swe.v20.DataBlock;
import net.opengis.swe.v20.DataComponent;
import net.opengis.swe.v20.DataEncoding;
import net.opengis.swe.v20.DataStream;
import org.sensorhub.api.sensor.SensorDataEvent;
import org.sensorhub.api.sensor.SensorException;
import org.sensorhub.impl.sensor.AbstractSensorOutput;
import org.sensorhub.impl.sensor.videocam.VideoCamHelper;
import org.vast.data.AbstractDataBlock;
import org.vast.data.DataBlockMixed;
import android.graphics.ImageFormat;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CaptureFailure;
import android.hardware.camera2.CaptureRequest;
import android.hardware.camera2.CaptureRequest.Builder;
import android.hardware.camera2.TotalCaptureResult;
import android.media.Image;
import android.media.ImageReader;
import android.media.ImageReader.OnImageAvailableListener;
import android.os.Handler;
import android.os.HandlerThread;
import android.view.Surface;
import android.view.SurfaceHolder;


/**
 * <p>
 * Implementation of data interface for Android cameras
 * </p>
 *
 * @author Alex Robin <alex.robin@sensiasoftware.com>
 * @since Jan 18, 2015
 */
public class AndroidCamera2Output extends AbstractSensorOutput<AndroidSensorsDriver> implements IAndroidOutput
{
    protected static final String TIME_REF = "http://www.opengis.net/def/trs/BIPM/0/UTC";
    
    CameraManager camManager;
    String cameraId;
    CameraDevice camera;
    CameraCharacteristics camCharacteristics;
    CameraCaptureSession captureSession;
    SurfaceHolder previewSurfaceHolder;
    ImageReader imgEncoder;
    //MediaCodec mCodec;
    //MediaMuxer mMuxer;
    //File videoFile;
    HandlerThread cameraThread;
    Handler cameraHandler;
    HandlerThread processThread;
    Handler processHandler;
    int imgHeight, imgWidth, frameRate;
    
    String name;
    DataComponent dataStruct;
    DataEncoding dataEncoding;
    int samplingPeriod;
    long systemTimeOffset = -1L;
    
    
    protected AndroidCamera2Output(AndroidSensorsDriver parentModule, CameraManager camManager, String cameraId, SurfaceHolder previewSurfaceHolder)
    {
        super(parentModule);
        this.camManager = camManager;
        this.cameraId = cameraId;
        this.name = "camera" + cameraId + "_data";
        this.previewSurfaceHolder = previewSurfaceHolder;
    }
    
    
    @Override
    public String getName()
    {
        return name;
    }
    
    
    @Override
    public void start(Handler eventHandler) throws SensorException
    {
        final Object camLock = new Object();
        
        // for camera setup and capture
        cameraThread = new HandlerThread("CameraThread");
        cameraThread.start();
        cameraHandler = new Handler(cameraThread.getLooper());
        
        // for image compression and sending events
        processThread = new HandlerThread("ProcessThread");
        processThread.start();
        processHandler = new Handler(processThread.getLooper());        
        
        try
        {
            camCharacteristics = camManager.getCameraCharacteristics(cameraId);
            
            // TODO get closest values from camera characteristics
            imgWidth = 800;
            imgHeight = 600;
            frameRate = 1;
            
            // launch camera video recording
            camManager.openCamera(cameraId, new CameraDevice.StateCallback() {
                @Override
                public void onOpened(CameraDevice camera)
                {
                    log.debug("Camera " + camera.getId() + " opened");
                    AndroidCamera2Output.this.camera = camera;
                    synchronized(camLock) { camLock.notify(); }
                }

                @Override
                public void onDisconnected(CameraDevice camera)
                {
                    camera.close();
                    AndroidCamera2Output.this.camera = null;
                    synchronized(camLock) { camLock.notify(); }
                }

                @Override
                public void onError(CameraDevice camera, int error)
                {
                    log.error("Failed to open camera " + camera.getId() + " with error code " + error);
                    synchronized(camLock) { camLock.notify(); }                    
                }
                
            }, cameraHandler);
            
            // wait for camera to be opened
            synchronized (camLock)
            {
                if (camera == null)
                    camLock.wait(100L);
            } 
            
            if (camera == null)
                throw new SensorException("Failed to open camera " + camera.getId());
            
            // create SWE Common data structure            
            VideoCamHelper fac = new VideoCamHelper();
            DataStream videoStream = fac.newVideoOutputMJPEG(getName(), imgWidth, imgHeight);
            dataStruct = videoStream.getElementType();
            dataEncoding = videoStream.getEncoding();
            
            // start streaming video
            startCaptureSession(camera);
        }
        catch (SensorException e)
        {
            throw e;
        }
        catch (Exception e)
        {
            throw new SensorException("Cannot access camera " + cameraId, e);
        }
    }
    
    
    protected void startCaptureSession(final CameraDevice camera) throws Exception
    {
        Surface codecInputSurface;
        
        // prepare H264 encoder
        /*try
        {
            /*mCodec = MediaCodec.createEncoderByType(MediaFormat.MIMETYPE_VIDEO_AVC); //video/mp4v-es
            MediaFormat mediaFormat = MediaFormat.createVideoFormat(MediaFormat.MIMETYPE_VIDEO_AVC, imgWidth, imgHeight);
            mediaFormat.setInteger(MediaFormat.KEY_BIT_RATE, 2000000);
            mediaFormat.setInteger(MediaFormat.KEY_FRAME_RATE, frameRate);
            mediaFormat.setInteger(MediaFormat.KEY_COLOR_FORMAT, MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface);
            mediaFormat.setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 5);
            mCodec.configure(mediaFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
            codecInputSurface = mCodec.createInputSurface(); // use surface for direct connection to cam capture API
            mCodec.start();
            log.debug("MediaCodec initialized");
            
            videoFile = new File(AndroidSensorsDriver.androidContext.getExternalFilesDir(null), "video.mp4");
            mMuxer = new MediaMuxer(videoFile.getAbsolutePath(), MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
            //int rotation = AndroidSensorsDriver.androidContext..getDefaultDisplay().getRotation();
            mMuxer.setOrientationHint(90);
            log.debug("MediaMuxer initialized");
        }
        catch (Exception e)
        {
            throw new SensorException("Error while initializing codec " + mCodec.getName(), e);
        }*/
        
        /* prepare JPEG encoder */
        try
        {
            imgEncoder = ImageReader.newInstance(imgWidth, imgHeight, ImageFormat.JPEG, 2);
            codecInputSurface = imgEncoder.getSurface();
            log.debug("ImageReader initialized");            
        }
        catch (Exception e)
        {
            throw new SensorException("Error while initializing JPEG image encoder", e);
        }
        
        final Builder builder = camera.createCaptureRequest(CameraDevice.TEMPLATE_RECORD);
        ArrayList<Surface> surfaces = new ArrayList<Surface>(1);
        
        builder.addTarget(codecInputSurface);
        surfaces.add(codecInputSurface);
        
        if (previewSurfaceHolder != null)
        {
            Surface s = previewSurfaceHolder.getSurface();
            surfaces.add(s);
            builder.addTarget(s);
        }
        
        // create capture session to codec buffer
        //final MediaCodec.BufferInfo mBufferInfo = new MediaCodec.BufferInfo();
        camera.createCaptureSession(surfaces, new CameraCaptureSession.StateCallback() {
            @Override
            public void onConfigured(CameraCaptureSession session)
            {
                AndroidCamera2Output.this.captureSession = session;
                
                try
                {
                    //builder.set(CaptureRequest.CONTROL_AE_MODE, CameraMetadata.CONTROL_AE_MODE_OFF);
                    //builder.set(CaptureRequest.SENSOR_EXPOSURE_TIME, 1000L);
                    //builder.set(CaptureRequest.CONTROL_AF_MODE, CameraMetadata.CONTROL_AF_MODE_AUTO);
                    //builder.set(CaptureRequest.SENSOR_FRAME_DURATION, (long)(1e9 / frameRate));
                    CaptureRequest captureReq = builder.build();
                    log.debug("Capture request created");
                   
                    session.setRepeatingRequest(captureReq, new CameraCaptureSession.CaptureCallback()
                    {
                        /*@Override
                        public void onCaptureStarted(CameraCaptureSession session, CaptureRequest request, long timestamp, long frameNumber)
                        {
                            log.debug("Capture started");
                        }*/

                        @Override
                        public void onCaptureCompleted(CameraCaptureSession session, CaptureRequest request, TotalCaptureResult result)
                        {
                            log.debug("Image " + result.getFrameNumber() + " captured");
                            //log.debug("Exp=" + result.get(CaptureResult.SENSOR_EXPOSURE_TIME));
                            
                            /*while (true) {
                                int bufferIndex = mCodec.dequeueOutputBuffer(mBufferInfo, 5000);
                                
                                if (bufferIndex == MediaCodec.INFO_OUTPUT_FORMAT_CHANGED) 
                                {
                                    MediaFormat newFormat = mCodec.getOutputFormat();
                                    mMuxer.addTrack(newFormat);
                                    mMuxer.start();
                                }
                                else if (bufferIndex >= 0)
                                {
                                    ByteBuffer buf = mCodec.getOutputBuffer(bufferIndex);
                                    System.out.println(mBufferInfo.flags);
                                    
                                    // generate new data record
                                    DataBlock newRecord;
                                    if (latestRecord == null) {
                                        newRecord = dataStruct.createDataBlock();
                                        ((DataBlockMixed)newRecord).getUnderlyingObject()[1] = new DataBlockCompressed();
                                    }
                                    else
                                        newRecord = latestRecord.renew();
                                    
                                    // set time stamp
                                    long expTimeStampNanos = result.get(CaptureResult.SENSOR_TIMESTAMP);
                                    double latestRecordTime = getJulianTimeStamp(expTimeStampNanos);
                                    newRecord.setDoubleValue(0, latestRecordTime);
                                    
                                    // set encoded data
                                    log.debug("Buffer size is " + mBufferInfo.size + "/" + buf.limit());
                                    AbstractDataBlock frameData = ((DataBlockMixed)newRecord).getUnderlyingObject()[1];
                                    byte[] frameBytes = new byte[buf.limit()];
                                    buf.get(frameBytes);
                                    frameData.setUnderlyingObject(frameBytes);
                                    
                                    // send event
                                    latestRecord = newRecord;
                                    //eventHandler.publishEvent(new SensorDataEvent(latestRecordTime, AndroidCameraOutput.this, latestRecord));
                                    
                                    // also mux to mp4 file for checking
                                    buf.rewind();
                                    mMuxer.writeSampleData(0, buf, mBufferInfo);
                                    
                                    mCodec.releaseOutputBuffer(bufferIndex, false);
                                    break;
                                }
                            }*/
                        }
                        
                        @Override
                        public void onCaptureFailed (CameraCaptureSession session, CaptureRequest request, CaptureFailure failure)
                        {
                            log.error("Video capture failed, error=" + failure.getReason());
                        }
                    }, cameraHandler);
                }
                catch (Exception e)
                {
                    log.error("Could not start repeating capture");  
                }               
            }

            @Override
            public void onConfigureFailed(CameraCaptureSession session)
            {
                log.error("Could not configure capture session");          
            }            
        }, cameraHandler);
        
        
        final Runnable sendImgRunnable = new Runnable()
        {
            @Override
            public void run()
            {
                // retrieve imageReader buffer
                Image img = imgEncoder.acquireLatestImage();
                if (img == null)
                    return;
                ByteBuffer buf = img.getPlanes()[0].getBuffer();
                
                // generate new data record
                DataBlock newRecord;
                if (latestRecord == null)
                    newRecord = dataStruct.createDataBlock();
                else
                    newRecord = latestRecord.renew();
                
                // set time stamp
                double samplingTime = getJulianTimeStamp(img.getTimestamp());
                newRecord.setDoubleValue(0, samplingTime);
                
                // set encoded data
                //AbstractDataBlock frameData = (AbstractDataBlock)newRecord;
                AbstractDataBlock frameData = ((DataBlockMixed)newRecord).getUnderlyingObject()[1];
                byte[] frameBytes = new byte[buf.limit()];
                buf.get(frameBytes);
                frameData.setUnderlyingObject(frameBytes);
                img.close();
                
                // send event
                latestRecord = newRecord;
                latestRecordTime = System.currentTimeMillis();
                eventHandler.publishEvent(new SensorDataEvent(latestRecordTime, AndroidCamera2Output.this, latestRecord));                
            }
        };
        
        
        imgEncoder.setOnImageAvailableListener(new OnImageAvailableListener()
        {
            @Override
            public void onImageAvailable(ImageReader encoder)
            {
                log.debug("Image encoded");
                //backgroundHandler.post(sendImgRunnable);
                sendImgRunnable.run();
            }
            
        }, processHandler);
    }
    
    
    @Override
    public void stop()
    {
        if (captureSession != null)
        {
            try { captureSession.stopRepeating(); }
            catch (CameraAccessException e) { }
            captureSession.close();
            captureSession = null;
        }
        
        if (camera != null)
        {
            camera.close();
            camera = null;
        }
        
        /*if (mCodec != null)
        {
            mCodec.signalEndOfInputStream();
            mCodec.stop();
            mCodec.release();
            mCodec = null;
        }
        
        if (mMuxer != null)
        {
            mMuxer.stop();
            mMuxer.release();
            mMuxer = null;
        }*/
        
        if (imgEncoder != null)
            imgEncoder.close();
        
        if (cameraThread != null)
        {
            cameraThread.quitSafely();
            cameraThread = null;
        }
        
        if (processThread != null)
        {
            processThread.quitSafely();
            processThread = null;
        }
        
        // make sure created video file is visible
        //String[] paths = new String[] {videoFile.getAbsolutePath()};
        //MediaScannerConnection.scanFile(AndroidSensorsDriver.androidContext, paths, null, null);
    }


    @Override
    public double getAverageSamplingPeriod()
    {
        return 1./ (double)frameRate;
    }


    @Override
    public DataComponent getRecordDescription()
    {
        return dataStruct;
    }


    @Override
    public DataEncoding getRecommendedEncoding()
    {
        return dataEncoding;
    }

    
    @Override
    public DataBlock getLatestRecord()
    {
        return latestRecord;
    }
    
    
    @Override
    public long getLatestRecordTime()
    {
        return latestRecordTime;
    }
    
    
    protected final double getJulianTimeStamp(long sensorTimeStampNanos)
    {
        long sensorTimeMillis = sensorTimeStampNanos / 1000000;
        
        if (systemTimeOffset < 0)
            systemTimeOffset = System.currentTimeMillis() - sensorTimeMillis;
            
        return (systemTimeOffset + sensorTimeMillis) / 1000.;
    }
}
