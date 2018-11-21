'use strict';
const GlslCanvas = require('glslCanvas');

var buffer;

function setCanvasToClientDims() {
	if(!buffer)
		return;
	buffer.width = document.documentElement.clientWidth / 2;
	buffer.height = document.documentElement.clientHeight / 2;
}

module.exports = (video) => {
	buffer = document.getElementById('video-canvas');
	setCanvasToClientDims(buffer);
	window.addEventListener('resize', setCanvasToClientDims);
	let rendervideo = () => {
		buffer.getContext('2d').drawImage(video, 0, 0, buffer.width, buffer.height);
		window.requestAnimationFrame(rendervideo);
	};
	rendervideo();
}
