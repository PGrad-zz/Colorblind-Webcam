'use strict'

function get_webcam() {
	return window.navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { facingMode: 'user' }
	});
}
