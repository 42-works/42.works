import { glMatrix, mat4, quat, vec3 } from "gl-matrix";

export const vertex_shader = `precision highp float;
#define M_PI 3.1415926535897932384626433832795

attribute vec3 coord;
attribute vec2 texCoord;

uniform mat4 transform_viewProjection;
uniform float animation_param;

uniform float x_range;
uniform float y_range;

varying vec2 vert_texcoord;


float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

void main(){
  vert_texcoord = texCoord;
  vec2 noise_vec = texCoord * x_range - x_range / 2.0; 
  float n = y_range * noise(vec3(noise_vec,animation_param));
   vec4 result_coord = vec4(coord,1.0) + vec4(0.0,n,0.0,0.0);
	gl_Position = transform_viewProjection * result_coord;
}
`;

export const fragment_shaders = `precision highp float;
#define M_PI 3.1415926535897932384626433832795

varying vec2 vert_texcoord;
uniform float animation_param;
uniform float line_ratio;
uniform float line_count;
  
void main(){
    float t = fract((vert_texcoord[1]+animation_param/2.0) * line_count);
    if(t <= line_ratio ){
      gl_FragColor = vec4(0.1620,0.1526,0.6854,min(1.0,vert_texcoord[1]*7.0));
    }
    else {
      gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    }
    
  }
`;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

const initShaderProgram = gl => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertex_shader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragment_shaders);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }
  return shaderProgram;
};

export const createShaderProgram = gl => {
  const shaderProgram = initShaderProgram(gl);
  if (shaderProgram === null) return null;
  const uniforms = {
    viewProjectionLocation: gl.getUniformLocation(
      shaderProgram,
      "transform_viewProjection"
    ),
    animationParamLocation: gl.getUniformLocation(
      shaderProgram,
      "animation_param"
    ),
    xRangeLocation: gl.getUniformLocation(shaderProgram, "x_range"),
    yRangeLocation: gl.getUniformLocation(shaderProgram, "y_range"),
    lineRatioLocation: gl.getUniformLocation(shaderProgram, "line_ratio"),
    lineCountLocation: gl.getUniformLocation(shaderProgram, "line_count")
  };
  const attributes = {
    coordsLocation: gl.getAttribLocation(shaderProgram, "coord"),
    texCoordLocation: gl.getAttribLocation(shaderProgram, "texCoord")
  };
  const setAnimationParam = t => {
    gl.useProgram(shaderProgram);
    gl.uniform1f(uniforms.animationParamLocation, t);
  };

  const setFunctionParams = (
    x = 25,
    y = 40,
    line_ratio = 0.3,
    line_count = 100
  ) => {
    gl.useProgram(shaderProgram);
    gl.uniform1f(uniforms.xRangeLocation, x);
    gl.uniform1f(uniforms.yRangeLocation, y);
    gl.uniform1f(uniforms.lineRatioLocation, line_ratio);
    gl.uniform1f(uniforms.lineCountLocation, line_count);
  };

  const projectionMatrix = mat4.create();
  const viewMatrix = mat4.create();
  const modelTransformMatrix = mat4.create();
  const fullProjMat = mat4.create();
  const rotation = quat.create();
  const translation = vec3.create();
  const setViewProjectionMatrix = (PLANE_WIDTH, PLANE_HEIGHT) => {
    gl.useProgram(shaderProgram);
    const distanceToEye = PLANE_HEIGHT;
    const angle = -30;
    const elevation =
      (2 * Math.sin(glMatrix.toRadian(angle)) * PLANE_HEIGHT) / 2;
    quat.fromEuler(rotation, angle, 0, 0);
    vec3.set(translation, -PLANE_WIDTH / 2, elevation / 2, -PLANE_HEIGHT / 2);
    mat4.fromRotationTranslation(modelTransformMatrix, rotation, translation);
    mat4.perspectiveFromFieldOfView(
      projectionMatrix,
      {
        upDegrees: 25,

        downDegrees: 25,

        leftDegrees: 15,

        rightDegrees: 15
      },
      1,
      10000
    );
    mat4.lookAt(viewMatrix, [0, 0, -distanceToEye], [0, 0, 0], [0, 1, 0]);
    mat4.mul(viewMatrix, viewMatrix, modelTransformMatrix);
    mat4.mul(fullProjMat, projectionMatrix, viewMatrix);
    gl.uniformMatrix4fv(uniforms.viewProjectionLocation, false, fullProjMat);
  };

  const useShader = () => {
    gl.useProgram(shaderProgram);
  };

  return {
    program: shaderProgram,
    attributes,
    uniforms,
    setViewProjectionMatrix,
    setAnimationParam,
    setFunctionParams,
    useShader
  };
};
