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

	void main() {
		vec2 st = var_vertTexCoord.xy /u_resolution.xy;
		st.x*=u_resolution.x/u_resolution.y;
		
		st.x+=cnoise(vec3(st*2.,100.))/30.;
		st.y+=cnoise(vec3(st*20.,1000.))/30.;
		

		vec3 color = vec3(0.);
		vec4 texColor = texture2D(u_tex,st);
		float d = distance(vec2(0.5) ,st);
		color*=1.-d;
		gl_FragColor= vec4(color,1.0)+texColor;
	}
`;
