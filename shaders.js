module.exports = {
	"fragment" : `
		precision highp float;
		uniform sampler2D u_texture;
		uniform vec2 u_resolution;

		void main() {
			vec2 uv = gl_FragCoord.xy / u_resolution.xy;
			vec3 col = texture2D(u_texture, uv).rgb;
			gl_FragColor = vec4(col, 1);
		}
	`
};
