/***************************************
D-pad
***************************************/
var video = $("video");
$(window).bind("keydown", onKeyDownHandler );
function onKeyDownHandler( e ){
	switch( e.keyCode ){
		//Left arrow
		case 37:
		break;
		//Up
		case 38:
		break;
		//Right
		case 39:
		break;
		//Down
		case 40:
		break
		//Skip foward
		case 176:
		break;
		//Skip back
		case 177:
		break;
		//Stop
		case 178:
		break;
		//Play / pause
		case 179:
		break;
		//Fast forward
		case 227:
		break;
		//Rewind
		case 228:
		break;
		case 227:
		//fast forward 10 seconds
		video.currentTime += 10;
		break;
		case 228: 
		//rewind by 10 seconds
		video.currentTime -= 10;
		break;
		case 179:
		if( video.paused ) video.play();
		else video.pause();
		break;
	}
}