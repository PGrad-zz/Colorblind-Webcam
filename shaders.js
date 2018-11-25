module.exports = {
	"fragment" : `
		precision highp float;
		uniform sampler2D u_texture;
		uniform sampler2D u_tex0;
		uniform vec2 u_resolution;

		void main() {
			vec2 uv = gl_FragCoord.xy / u_resolution.xy;
			vec3 col = texture2D(u_texture, uv).rgb;
			vec3 pal = texture2D(u_tex0, vec2(uv.x, .5)).rgb;
			gl_FragColor = vec4(mix(col, pal, .5), 1);
		}
	`
};
