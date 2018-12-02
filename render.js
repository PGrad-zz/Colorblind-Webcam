'use strict';
const GlslCanvas = require('glslCanvas');
const shaders = require('./shaders.js');

var buffer;
var canvas;

function setCanvasToClientDims() {
	if(!buffer || !canvas)
		return;
	let width = document.documentElement.clientWidth / 4;
	let height = document.documentElement.clientHeight / 4;
	let realcanvas = document.getElementById('real-canvas');
	buffer.width = width;
	buffer.height = height;
	realcanvas.width = width;
	realcanvas.height = height;
}

module.exports = (video) => {
	buffer = document.getElementById('video-canvas');
	canvas = new GlslCanvas(document.getElementById('real-canvas'));
	setCanvasToClientDims();
	window.addEventListener("resize", setCanvasToClientDims);
	let rendervideo = () => {
		buffer.getContext('2d').drawImage(video, 0, 0, buffer.width, buffer.height);
		canvas.setUniform('u_texture', buffer.toDataURL());
		canvas.setUniform('u_start_r', 204);
		window.requestAnimationFrame(rendervideo);
	};
	rendervideo();
	canvas.load(shaders.fragment);
	video.play();
}
