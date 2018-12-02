module.exports = {
	"fragment" : `
		precision highp float;
		uniform sampler2D u_texture;
		uniform sampler2D u_tex0;
		uniform vec2 u_resolution;
		uniform float u_start_r;

		vec3 hsl2rgb(float _h, float _s, float _l) {
			vec3 rgb = vec3(0);
			return rgb;
		}

		vec3 rgb2hsl(float _r, float _g, float _b) {
			float max_ch = max(max(_r, _g), _b);
			float min_ch = min(min(_r, _g), _b);
			float max_i = _r == max_ch ? 1. : _g == max_ch ? 2. : 3.;
			vec3 hsl = vec3(0);
			hsl.z = (max_ch + min_ch) / 2.;
			if(max_ch == min_ch)
				return hsl;
			float d = max_ch - min_ch;
			hsl.y = hsl.z > .5 ? (d / (2. - max_ch - min_ch)) : (d / (max_ch + min_ch));
			hsl.x = max(0., max_i - 1.) * ((_g - _b) / d + (_g < _b ? 6. : 0.))
			        + max(0., max_i - 2.) * ((_b - _r) / d + 2.)
			        + max(0., max_i - 3.) * ((_r - _g) / d + 4.);
			hsl.x /= 6.;
			return hsl;
		}

		vec2 testTexCoordMap(vec2 uv) {
			vec2 row_bounds = vec2(323. - u_start_r, 323. - u_start_r - 30.) / 323.;
			return vec2(uv.x, mix(row_bounds.x, row_bounds.y, uv.y));
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / u_resolution.xy;
			vec3 col = texture2D(u_texture, uv).rgb;
			vec3 pal = texture2D(u_tex0, testTexCoordMap(uv)).rgb;
			gl_FragColor = vec4(mix(col, pal, .5), 1);
		}
	`
};
