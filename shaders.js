module.exports = {
	"fragment" : `
		precision highp float;
		uniform sampler2D u_texture;
		uniform sampler2D u_tex0;
		uniform vec2 u_resolution;
		uniform float u_start_r;

		float lessbool(float val, float cmp) {
			float res = min(val, cmp);
			return res == cmp ? 0. : res == 0. ? 1. : res / res;
		}

		float grtrbool(float val, float cmp) {
			float res = max(val, cmp);
			return res == cmp ? 0. : res == 0. ? 1. : res / res;
		}

		float eqbool(float val, float cmp) {
			return val == cmp ? 1. : 0.;
		}

		float hue2rgb(float p, float q, float t) {
			if(t < 0.) t += 1.;
			if(t > 1.) t -= 1.;
			return t < .16667 ? (p + (q - p) * 6. * t)            :
			       t < .5     ? q                                 :
			       t < .6667  ? (p + (q - p) * (.66667 - t) * .6) :
			       p;
		}

		vec3 hsl2rgb(float _h, float _s, float _l) {
			vec3 rgb = vec3(0);
			float r, g, b;
			float q, p;
			if(_s == 0.)
				r = g = b = _l;
			else {
				q = _l <= 0.5 ? _l * (1. + _s) : (_l + _s - _l * _s);
				p = 2. * _l - q;
				r = hue2rgb(p, q, _h + .33333);
				g = hue2rgb(p, q, _h);
				b = hue2rgb(p, q, _h - .33333);
			}

			return vec3(r, g, b);
		}

		vec3 hsl2rgb(vec3 hsl) {
			return hsl2rgb(hsl.r, hsl.g, hsl.b);
		}

		vec3 rgb2hsl(float _r, float _g, float _b) {
			float max_ch = max(max(_r, _g), _b);
			float min_ch = min(min(_r, _g), _b);
			float max_i = _r == max_ch ? 1. : _g == max_ch ? 2. : 3.;
			vec3 hsl = vec3(0);
			hsl.z = (max_ch + min_ch) * .5;
			if(max_ch != min_ch) {
				float d = max_ch - min_ch;
				hsl.y = hsl.z > .5 ? (d / (2. - max_ch + min_ch)) : (d / (max_ch + min_ch));
				hsl.x = max_i == 1. ? ((_g - _b) / d) :
				        max_i == 2. ? ((_b - _r) / d + 2.) :
						                  ((_r - _g) / d + 4.);
				hsl.x /= 6.;
			}
			return hsl;
		}

		vec3 rgb2hsl(vec3 hsl) {
			return rgb2hsl(hsl.r, hsl.g, hsl.b);
		}

		vec2 texCoordMap(vec2 uv) {
			vec2 row_bounds = vec2(323. - u_start_r, 323. - u_start_r - 30.) / 323.;
			return vec2(uv.x, mix(row_bounds.x, row_bounds.y, uv.y));
		}

		vec3 char_hue(float h) {
			return texture2D(u_tex0, texCoordMap(vec2(h, .5))).rgb;
		}

		float map_hue(float h) {
			return rgb2hsl(char_hue(h)).x;
		}

		vec3 map_color_into_palette(vec3 rgb) {
			vec3 hsl_orig = rgb2hsl(rgb);
			return hsl2rgb(map_hue(hsl_orig.x), hsl_orig.y, hsl_orig.z);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / u_resolution.xy;
			vec3 col = texture2D(u_texture, uv).rgb;
			//vec3 col = vec3(uv.x, 0, uv.y);
			gl_FragColor = vec4(map_color_into_palette(col), 1.);
		}
	`
};
