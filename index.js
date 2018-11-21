'use strict'


function main() {
	get_webcam().then((stream) => {
		const video = document.getElementById('webcam');
		video.srcObject = stream;
		video.oncanplay = () => {
			render(video);
			video.play();
		};
	}).catch(() => {
		alert("\"What a shame\" - JC Denton");
	});
}

main();
