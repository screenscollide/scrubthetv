/**
* Remote
* @author mail@chrisaiv.com
* 11/2/2012
*/

////////////////////////////////////////////////////////////
//Browser
////////////////////////
$( "#selections" ).bind("change", function( e ){
	//var videoId = $('#selections #videos').fieldValue( false );
	var videoId = $("option:selected").val()
	//Fire off these events to '/partial/email-a-friend.ejs'
	$(document).trigger("updateVideoId", $("option:selected").val() )
	$(document).trigger("updateTextarea", $("option:selected").text() );

	//Load video
	var videoId = $( this + "option:selected").val();
	if( videoId != "" ) loadVideo( videoId );
});

// Vertical slider
$("#slider-vertical").slider({
	orientation: "vertical",
	range: "min",
	min: 0,
	max: 100,
	value: 60,
	slide: function (event, ui) {
		var volume = ui.value;
		$("#amount").val( volume );
		socket.emit('videovolume', volume )
	}
});
var initVol = $("#slider-vertical").slider("value");
$("#amount").val( initVol );

////////////////////////////////////////////////////////////
//Slider
////////////////////////
var superDuration = 0;

function initSlider( duration ){
	if( superDuration <  1 ) superDuration = duration;
	// Slider
	$('#slider-horizontal').slider({
		range: true,
		values: [0, 100],
		change: function(e, ui){
			var value = ui.value;
			var currentTime =  Math.floor( superDuration / value * 100 );
			console.log( "dur:", duration, "val:", value, "currTime:", currentTime );
			setVideoUpdate( currentTime );
		}
	});
	$("#slider-horizontal").show();
	//Reveal the slider
	$(".seekBar").show();
	//Max Slider
	$("#maxSlider").val( Math.floor( duration ) );
	//Min + Max Slider
	$("#minSlider, #maxSlider").attr({ "max": Math.floor( duration ) });
	//Slider adjusters
	$('#minSlider, #maxSlider').change( function(){
		var min = parseInt( $("#minSlider").val() );
		var max = parseInt( $('#maxSlider').val() );
		if (min > max) {
			$(this).val(max);
			$(this).slider('refresh');
		}
		//Send data to server (app.js)
		var currentTime = $(this).val();
		setVideoUpdate( currentTime );
	});
}

function resetTimeSlider( ){
	$("#minSlider").val( 0 );
	$('#slider-horizontal').val( 0 );
}

function updateTimeSlider( duration ){
	//If the slider isn't visible yet and there's a duration, initialize
	if( !$("#slider-horizontal").is(":visible") && duration ) {
		initSlider( duration );
	}
}	

//SET it before you GET it
function setCurrentTime( time ){
	var currentTime = time;
	getCurrentTime = function() {
		return currentTime;
	}	
}

////////////////////////////////////////////////////////////
//Socket.io
////////////////////////
var socket = io.connect( "/" );
socket.on( "onVideoDuration", function( obj ){
	//console.log( "onVideoDuration", obj.duration, "onCurrentTime", obj.currentTime );
	setCurrentTime( obj.currentTime  );
	updateTimeSlider( obj.duration );
});
socket.on( "onVideoPlaying", function( obj ){
	console.log( "From TV::onVideoPlaying" );
});

socket.on( "onVideoPaused", function( obj ){
	console.log( "From TV::onVideoPaused" );
});

socket.on( "emailStatus", function( success ) {
	console.log("Blah", success );
	$(this).trigger("emailStatus", success )
});

$('#volume').change( setVideoVolume );
function setVideoVolume( e ) {
	var volume = parseInt( $( this ).val() );
	console.log( volume );
	if(isNaN(volume) || volume < 0 || volume > 100) $("header").html("Please enter a valid volume between 0 and 100.");
	else socket.emit('videovolume', volume );
}

$("#play").bind("click", playVideo );
function playVideo( e ) {
	if( $(this).hasClass("play") ){
		$(this).removeClass()
		$(this).addClass("pause")
		socket.emit( "videopause" );
	} else {
		$(this).removeClass();
		$(this).addClass("play");
		socket.emit( "videoplay" );
	}
	$(document).trigger("updateCurrentTime", getCurrentTime() );
}

$("#mute").bind("click", muteVideo );
function muteVideo( e ) {
	if( $(this).hasClass("mute") ){
		$(this).removeClass("mute");
		$(this).addClass("unmute");
		
		socket.emit( 'videomute' );
	} else {
		$(this).removeClass("unmute");
		$(this).addClass("mute");
		
		socket.emit('videounmute' );
	}
}

function loadVideo( id ){
	socket.emit( "videoload", id );
}

function setVideoUpdate( currentTime ){
	socket.emit('videoupdate', currentTime );
}
