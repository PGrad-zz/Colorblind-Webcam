'use strict';

const get_webcam = require('./webrtc.js');
const render = require('./render.js');

function main() {
	get_webcam().then((stream) => {
		const video = document.getElementById('webcam');
		video.srcObject = stream;
		video.oncanplay = () => {
			render(video);
		};
	}).catch(() => {
		alert("\"What a shame\" - JC Denton");
	});
}

main();
