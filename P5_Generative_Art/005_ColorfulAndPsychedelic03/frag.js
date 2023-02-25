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

    return texture2D(u_tex, coord);
 }

	void main() {
    vec2 st = var_vertTexCoord.xy /u_resolution.xy;

    st*=1.;
		st.y*=u_resolution.y/u_resolution.x;

		vec2 st0 = st;
		
		st0.y-=cnoise(vec3(st0*${Math.random() * 300 + 450},0.))/${
  Math.random() * 10 + 250
};
		st0.x+=cnoise(vec3(st0*500.,u_time/300.))/${Math.random() * 10 + 350};
		st0.y-=cnoise(vec3(st0*${Math.random() * 100 + 450},0.))/${
  Math.random() * 10 + 250
}; 


    vec4 distortedColor = radialDistortion(st0);


    st.y+=cnoise(vec3(st*20.,u_time/100.))/${Math.random() * 100 + 100};
		st.y+=cnoise(vec3(st*50.,u_time/10.))/90.;
		st.x+=cnoise(vec3(st*50.,u_time/10.))/90.;

    gl_FragColor = distortedColor;
	}
`;
