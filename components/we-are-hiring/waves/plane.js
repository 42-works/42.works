function getVertices(width, height) {
  const vertices = new Float32Array(getVerticesCount(width, height));
  let i = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      //coords
      vertices[i++] = col;
      vertices[i++] = 0.0;
      vertices[i++] = row;
      //tex coords
      vertices[i++] = col / width;
      vertices[i++] = row / height;
    }
  }
  return vertices;
}

function getVerticesCount(width, height) {
  return width * height * 5;
}

function getIndices(width, height) {
  let indices = new Uint32Array(getIndicesCount(width, height));
  let i = 0;
  for (let row = 0; row < height - 1; row++) {
    for (let col = 0; col < width - 1; col++) {
      const current_index = col + width * row;
      indices[i++] = current_index;
      indices[i++] = current_index + width;
      indices[i++] = current_index + 1;

      indices[i++] = current_index + width;
      indices[i++] = current_index + 1;
      indices[i++] = current_index + width + 1;
    }
  }
  return indices;
}

function getIndicesCount(width, height) {
  return (width - 1) * (height - 1) * 6;
}

export const createPlane = (gl, shader, width, height) => {
  const VBO = gl.createBuffer();
  gl.useProgram(shader.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, getVertices(width, height), gl.STATIC_DRAW);
  const IBO = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    getIndices(width, height),
    gl.STATIC_DRAW
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  gl.vertexAttribPointer(
    shader.attributes.coordsLocation,
    3,
    gl.FLOAT,
    false,
    20,
    0
  );
  gl.enableVertexAttribArray(shader.attributes.coordsLocation);
  gl.vertexAttribPointer(
    shader.attributes.texCoordLocation,
    2,
    gl.FLOAT,
    false,
    20,
    12
  );

  gl.enableVertexAttribArray(shader.attributes.texCoordLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  gl.useProgram(null);

  const verticesCount = getVerticesCount(width, height);
  const indicesCount = getIndicesCount(width, height);
  const drawPlane = () => {
    gl.drawElements(gl.TRIANGLES, indicesCount, gl.UNSIGNED_INT, 0);
  };
  const usePlane = () => {
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.enableVertexAttribArray(shader.attributes.coordsLocation);
    gl.enableVertexAttribArray(shader.attributes.texCoordLocation);
  };

  return {
    VBO,
    IBO,
    verticesCount,
    indicesCount,
    drawPlane,
    usePlane,
  };
};
