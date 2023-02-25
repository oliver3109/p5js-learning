//ref 3d shader from https://www.openprocessing.org/sketch/881537

const vert = `
	precision highp float;

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    // attributes, out
    varying vec2 var_vertTexCoord;
		varying vec4 var_centerGlPosition;//原点
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;
		uniform float u_time;

    void main() {
      vec3 pos = aPosition;
			vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
      gl_Position = posOut;

      // set out value
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(1.0, 1.0, 1.0, 1.0);
    }
`;
