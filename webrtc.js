'use strict';

module.exports = () => {
	return window.navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { facingMode: 'user' }
	});
}
