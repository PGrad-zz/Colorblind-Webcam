module.exports = {
	"fragment" : `
		precision highp float;
		uniform sampler2D u_texture;
		uniform sampler2D u_tex0;
		uniform vec2 u_resolution;
		uniform float u_start_r;

		vec3 rgb2hsv(vec3 c) {
		    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
		    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
		    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
		 
		    float d = q.x - min(q.w, q.y);
		    float e = 1.0e-10;
		    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
		}

		vec3 hsv2rgb(vec3 c) {
		    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
		    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
		    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
		}

		vec2 texCoordMap(vec2 uv) {
			vec2 row_bounds = vec2(323. - u_start_r, 323. - u_start_r - 30.) / 323.;
			return vec2(uv.x, mix(row_bounds.x, row_bounds.y, uv.y));
		}

		vec3 char_hue(float h) {
			return texture2D(u_tex0, texCoordMap(vec2(h, .5))).rgb;
		}

		float map_hue(float h) {
			return rgb2hsv(char_hue(h)).x;
		}

		vec3 map_color_into_palette(vec3 rgb) {
			vec3 hsv_orig = rgb2hsv(rgb);
			return hsv2rgb(vec3(map_hue(hsv_orig.x), hsv_orig.y, hsv_orig.z));
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / u_resolution.xy;
			vec3 col = texture2D(u_texture, uv).rgb;
			//vec3 col = vec3(uv.x, uv.y, 0);
			//vec3 col = texture2D(u_tex0, uv).rgb;
			gl_FragColor = vec4(map_color_into_palette(col), 1.);
		}
	`
}
