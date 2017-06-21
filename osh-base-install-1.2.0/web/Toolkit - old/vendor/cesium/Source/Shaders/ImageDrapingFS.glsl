varying vec3 v_positionEC;
varying vec3 v_normalEC;
varying vec2 v_st;


vec4 windowToEye(vec4 fragCoord)
{
  vec2 uv = fragCoord.xy / czm_viewport.zw;
  float z_window = czm_unpackDepth(texture2D(czm_globeDepthTexture, uv));
  if (z_window == 1.0)
    discard;
  
  float near = czm_depthRange.near;
  float far = czm_depthRange.far;
  
  vec3 ndcPos;
  ndcPos.x = 2.0 * (fragCoord.x - czm_viewport.x) / czm_viewport.z - 1.0;
  ndcPos.y = 2.0 * (fragCoord.y - czm_viewport.y) / czm_viewport.w - 1.0;
  ndcPos.z = (2.0 * z_window - near - far) / (far - near);
    
  vec4 clipPos;
  clipPos.w = czm_projection[3][2] / (ndcPos.z - (czm_projection[2][2] / czm_projection[2][3]));
  clipPos.xyz = ndcPos * clipPos.w;
  
  return czm_inverseProjection * clipPos;
  //return vec4(ndcPos, 1.0);
}


// Camera model and frames are based on OpenCV conventions:
// http://docs.opencv.org/2.4/modules/calib3d/doc/camera_calibration_and_3d_reconstruction.html
// we pass in a normalized intrinsic matrix as uniform so we can compute the normalized texture coordinates directly
void main()
{
    vec3 positionToEyeEC = -v_positionEC; 
        
    // get fragment 3D pos in eye coordinates using depth buffer value at fragment location
    vec4 v_posEC = windowToEye(gl_FragCoord);
    
    // translate to video cam frame
    vec4 camPosEC = czm_modelViewRelativeToEye * czm_translateRelativeToEye(camPosHigh_1, camPosLow_2);    
    vec4 v_posCam = v_posEC - camPosEC;
    
    // rotate to video cam frame
    vec3 lookRay = camAtt_3*czm_inverseViewRotation3D*v_posCam.xyz;
    
    // discard if behind camera
    if (lookRay.z < 0.1)
        discard;
    
    // undistort
    float xn = lookRay.x / lookRay.z;
    float yn = lookRay.y / lookRay.z;
    float k1 = camDistR_5[0];
    float k2 = camDistR_5[1];
    float k3 = camDistR_5[2];
    float p1 = camDistT_6[0];
    float p2 = camDistT_6[1];
    float r2 = xn*xn+yn*yn;
    float r4 = r2*r2;
    float r6 = r4*r2;
    float xd = xn*(1. + k1*r2 + k2*r4 + k3*r6) + 2.*p1*xn*yn + p2*(r2 + 2.*xn*xn);
    float yd = yn*(1. + k1*r2 + k2*r4 + k3*r6) + 2.*p2*xn*yn + p1*(r2 + 2.*yn*yn);
    
    // project with pinhole model
    vec3 st = camProj_4 * vec3(xd, yd, 1.);
    st.y = 1.0 - st.y;    
    if (st.x < 0.0 || st.x > 1.0 || st.y < 0.0 || st.y > 1.0)
        discard;

    // get color from material 
    czm_materialInput materialInput;
    materialInput.positionToEyeEC = positionToEyeEC;
    materialInput.st = vec2(st.x, st.y);
    czm_material material = czm_getMaterial(materialInput);    
    gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);

    //float depth = pow(v_posEC.z * 0.5 + 0.5, 8.0);
    //gl_FragColor = vec4(depth, depth, depth, 1.0);
}
