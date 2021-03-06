var video = document.querySelector("video"); 
var vidContainer = document.getElementById("video-container");
var track;
var playbtn = document.getElementById("play-pause");
var volumeToggle = document.getElementById("volume");
var fullscreen = document.getElementById("fullscreen");
var seekSlider = document.getElementById("seekslider");
var curTime = document.getElementById("curtime");
var durTime = document.getElementById("durtime");
var cc = document.getElementById("cc");
var captionTextDiv = document.getElementById("caption-text");
var captionSpan = captionTextDiv.getElementsByTagName("span");
var spanArr = [];
var mainControls = document.getElementById("main-btns");
var vidControls = document.getElementById("video-controls");



//****************************************
//           EVENT LISTENERS
//****************************************

video.addEventListener("loadedmetadata", loadContent);
playbtn.addEventListener("click", playPause);
fullscreen.addEventListener("click", fullScreen);
cc.addEventListener("click", captions);
volumeToggle.addEventListener("click", mute);
video.addEventListener("timeupdate", seekUpdate);
seekSlider.addEventListener("change", seek);
vidContainer.addEventListener("mouseenter", displayControls);
vidContainer.addEventListener("mouseleave", displayControlsOff);
video.addEventListener("click", playPause);
video.addEventListener("ended", function() {
	spanArr[15].classList.remove("highlight");
});




//****************************************
//             FUNCTIONS
//****************************************




function loadContent() {
	//Create TextTrack
	track = video.addTextTrack('subtitles', 'english', 'en');

	//Check to see if its Chrome or FireFox
	if (window.VTTCue) {
	track.addCue(new VTTCue(0.240, 4.130, "Now that we've looked at the architecture of the internet. let's see how you might"));
	track.addCue(new VTTCue(4.130, 7.535, 'connect your personal devices to the internet inside your house.'));
	track.addCue(new VTTCue(7.535, 11.270, 'Well there are many ways to connect to the internet, and'));
	track.addCue(new VTTCue(11.270, 13.960, 'most often people connect wirelessly.'));
	track.addCue(new VTTCue(13.960, 17.940, "Let's look at an example of how you can connect to the internet"));
	track.addCue(new VTTCue(17.940, 22.370, 'If you live in a city or a town, you probably have a coaxial cable for'));
	track.addCue(new VTTCue(22.370, 26.880, 'cable Internet, or a phone line if you have DSL, running to the outside of'));
	track.addCue(new VTTCue(26.880, 30.920, 'your house, that connects you to the Internet Service Provider, or ISP.'));
	track.addCue(new VTTCue(32.100, 34.730, "If you live far out in the country. you'll more likely have"));
	track.addCue(new VTTCue(34.730, 39.430, 'a dish outside your house, connecting you wirelessly to your closest ISP, or'));
	track.addCue(new VTTCue(39.430, 42.190, 'you might also use the telephone system.'));
	track.addCue(new VTTCue(42.350, 46.300, "Whether a wire comes straight from the ISP hookup outside your house, or"));
	track.addCue(new VTTCue(46.300, 49.270, 'it travels over radio waves from your roof,'));
	track.addCue(new VTTCue(49.270, 53.760, 'the first stop a wire will make once inside your house, is at your modem.'));
	track.addCue(new VTTCue(53.760, 57.780, 'A modem is what connects the internet to your network at home.'));
	track.addCue(new VTTCue(57.780, 59.999, 'A few common residential modems are DSL or'));
	} 
	
	//Add span elements to array
	//loop thru cues and add event listerners
	for(i = 0; i < captionSpan.length; i++) {
		spanArr.push(captionSpan.item(i));
		var span = spanArr[i];
		var cue = track.cues[i];
		addEventHandler(cue, span, i);
	}

}


// Add ENTER & EXIT events to cues
function addEventHandler(elem, elem2, index) {
    elem.addEventListener('enter', function() {
    	elem2.classList.add("highlight");
    });

    elem.addEventListener('exit', function() {
    	elem2.classList.remove("highlight");
    });
}


function playPause() {
	var play = document.getElementById("play");
	var pause = document.getElementById("pause");
	if(video.paused) {
		video.play();
		play.style.display = 'none';
		pause.style.display = 'block';
	} else {
		video.pause();
		play.style.display = 'block';
		pause.style.display = 'none';
	}
}


function fullScreen() {
	//multi browser support
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
}


function captions() {
	if(track.mode === "hidden"){
		track.mode = "showing";
	} else {
		track.mode = "hidden";
	}
}


function mute() {
	var volumeOn = document.getElementById("volume-on");
	var volumeOff = document.getElementById("volume-off");

	if(video.muted) {
		video.muted = false;
		volumeOn.style.display = 'block';
		volumeOff.style.display = 'none';
	} else {
		video.muted = true;
		volumeOn.style.display = 'none';
		volumeOff.style.display = 'block';
	}

}


function seekUpdate() { 
	var progressBar = document.getElementById("progress-bar");
	var nowTime = video.currentTime * (100 / video.duration);
	progressBar.value = nowTime; 
	seekSlider.value = nowTime;

	var curMins = Math.floor(video.currentTime / 60);
	var curSecs = Math.floor(video.currentTime - curMins * 60);
	var durMins = Math.floor(video.duration / 60);
	var durSecs = Math.floor(video.duration - durMins * 60);

	if(curSecs < 10) { curSecs = "0" + curSecs; } 
	if(durSecs < 10) { durSecs = "0" + durSecs; }
	if(curMins < 10) { curMins = "0" + curMins; } 
	if(durMins < 10) { durMins = "0" + durMins; }

	curTime.innerText = curMins +":" + curSecs;
	durTime.innerText = durMins +":" + durSecs;


	if(window.mozInnerScreenY) {


		if( video.currentTime < track.cues[0].endTime) {
			spanArr[0].classList.add("highlight");
		} else {
			spanArr[0].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[1].startTime && video.currentTime < track.cues[1].endTime) {
			spanArr[1].classList.add("highlight");
		} else {
			spanArr[1].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[2].startTime && video.currentTime < track.cues[2].endTime) {
			spanArr[2].classList.add("highlight");
		} else {
			spanArr[2].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[3].startTime && video.currentTime < track.cues[3].endTime) {
			spanArr[3].classList.add("highlight");
		} else {
			spanArr[3].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[4].startTime && video.currentTime < track.cues[4].endTime) {
			spanArr[4].classList.add("highlight");
		} else {
			spanArr[4].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[5].startTime && video.currentTime < track.cues[5].endTime) {
			spanArr[5].classList.add("highlight");
		} else {
			spanArr[5].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[6].startTime && video.currentTime < track.cues[6].endTime) {
			spanArr[6].classList.add("highlight");
		} else {
			spanArr[6].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[7].startTime && video.currentTime < track.cues[7].endTime) {
			spanArr[7].classList.add("highlight");
		} else {
			spanArr[7].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[8].startTime && video.currentTime < track.cues[8].endTime) {
			spanArr[8].classList.add("highlight");
		} else {
			spanArr[8].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[9].startTime && video.currentTime < track.cues[9].endTime) {
			spanArr[9].classList.add("highlight");
		} else {
			spanArr[9].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[10].startTime && video.currentTime < track.cues[10].endTime) {
			spanArr[10].classList.add("highlight");
		} else {
			spanArr[10].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[11].startTime && video.currentTime < track.cues[11].endTime) {
			spanArr[11].classList.add("highlight");
		} else {
			spanArr[11].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[12].startTime && video.currentTime < track.cues[12].endTime) {
			spanArr[12].classList.add("highlight");
		} else {
			spanArr[12].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[13].startTime && video.currentTime < track.cues[13].endTime) {
			spanArr[13].classList.add("highlight");
		} else {
			spanArr[13].classList.remove("highlight");
		}

		if( video.currentTime > track.cues[14].startTime && video.currentTime < track.cues[14].endTime) {
			spanArr[14].classList.add("highlight");
		} else {
			spanArr[14].classList.remove("highlight");
		}

		if(video.currentTime > track.cues[15].startTime && video.currentTime < track.cues[15].endTime) {
			spanArr[15].classList.add("highlight");
		}

	}

}


function seek() {
	var seekTo = video.duration * (seekSlider.value / 100);
	video.currentTime = seekTo;
}


function displayControls() {
	mainControls.style.display = "flex";
}


function displayControlsOff() {
	mainControls.style.display = "none";
}
















