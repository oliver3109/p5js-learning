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
		
		vec2 st0 = st;
		
		st0.y-=cnoise(vec3(st0*${Math.random() * 100 + 100},0.))/${
  Math.random() * 10 + 250
};
		st0.x+=cnoise(vec3(st0*500.,u_time/300.))/${Math.random() * 10 + 150};
		st0.y-=cnoise(vec3(st0*${Math.random() * 100 + 100},0.))/${
  Math.random() * 10 + 250
}; 


		vec3 color = vec3(0.);
		vec4 texColor = texture2D(u_tex,st0);
		// float d = distance(vec2(0.5) ,st);
		// color*=1.-d;
		gl_FragColor= vec4(color,1.0)+texColor;
	}
`;
