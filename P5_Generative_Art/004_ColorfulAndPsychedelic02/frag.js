const frag = `
	precision highp float;

	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform float u_time;
	uniform vec3 u_lightDir;
	uniform vec3 u_col;
	uniform mat3 uNormalMatrix;
	uniform float u_pixelDensity;
	uniform sampler2D u_tex;
	uniform float u_radius;
	uniform float u_angle;
	uniform float u_center;

	//attributes, in
	varying vec4 var_centerGlPosition;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	${frag_functions_default}

  vec4 radialDistortion(vec2 coord) {
    vec2 polarCoord = coord - u_center;
    float r = length(polarCoord);
    float a = atan(polarCoord.y, polarCoord.x);

    r = pow(r / u_radius, 2.0);
    a += u_angle;

    vec2 distortedCoord = vec2(r * cos(a), r * sin(a)) + u_center;

    return texture2D(u_tex, distortedCoord);
 }

	void main(){
    vec4 distortedColor = radialDistortion(var_vertTexCoord);
    gl_FragColor = distortedColor;
	}
`;
