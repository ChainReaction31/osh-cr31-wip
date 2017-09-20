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

import android.graphics.SurfaceTexture;
import org.sensorhub.api.module.ModuleConfig;
import org.sensorhub.api.sensor.SensorConfig;
import android.content.Context;


/**
 * <p>
 * Configuration class for the generic Android sensors driver
 * </p>
 *
 * @author Alex Robin <alex.robin@sensiasoftware.com>
 * @since Sep 6, 2013
 */
public class AndroidSensorsConfig extends SensorConfig
{     
    public final static String JPEG_CODEC = "JPEG";
    public final static String H264_CODEC = "H264";    
    
    public boolean activateAccelerometer = false;
    public boolean activateGyrometer = false;
    public boolean activateMagnetometer = false;
    public boolean activateOrientationQuat = true;
    public boolean activateOrientationEuler = true;
    public boolean activateGpsLocation = true;
    public boolean activateNetworkLocation = false;
    public boolean activateBackCamera = false;
    public boolean activateFrontCamera = false;
    public String videoCodec = JPEG_CODEC; 
    
    public String deviceName;
    public String runName;
    public String runDescription; 
    
    public transient Context androidContext;
    public transient SurfaceTexture camPreviewTexture;
       
    
    
    public AndroidSensorsConfig()
    {
        this.moduleClass = AndroidSensorsDriver.class.getCanonicalName();
    }


    @Override
    public ModuleConfig clone()
    {
        return this; // disable clone for now as it crashes Android app
    }
}
