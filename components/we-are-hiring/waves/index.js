import { createShaderProgram } from "./shaders";
import { createPlane } from "./plane";

const PLANE_WIDTH = 300;
const PLANE_HEIGHT = 300;

const initGL = gl => {
  gl.getExtension("OES_element_index_uint");
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
};

function resize(gl, canvas, shader) {
  // Lookup the size the browser is displaying the canvas.
  let realToCSSPixels = window.devicePixelRatio;
  let displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
  let displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is not the same size.
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // Make the canvas the same size
    canvas.width = window.innerWidth;
    canvas.height = 300;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
}

export const drawWaves = canvas => {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    depth: true,
    antialias: true
  });
  if (!gl) return;
  initGL(gl);
  const shader = createShaderProgram(gl);
  const plane = createPlane(gl, shader, PLANE_WIDTH, PLANE_HEIGHT);
  shader.useShader();
  let start = null;
  const speed = 0.03;

  window.addEventListener(
    "resize",
    () => {
      handleResize = true;
    },
    { capture: true, passive: true }
  );
  let handleResize = true;
  plane.usePlane();
  shader.useShader();
  shader.setFunctionParams(35, 45, 0.2, 60);
  shader.setViewProjectionMatrix(PLANE_WIDTH, PLANE_HEIGHT);
  const animate = timestamp => {
    if (handleResize) {
      resize(gl, canvas, shader);
      handleResize = false;
    }
    if (!start) start = timestamp;
    var time_passed = (((timestamp - start) * speed) % 1000) / 1000;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    shader.setAnimationParam(time_passed);
    plane.drawPlane();
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
  return true;
};
