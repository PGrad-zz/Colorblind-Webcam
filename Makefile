all:
	browserify index.js render.js webrtc.js shaders.js -s webcam-htsi > bundle.js
