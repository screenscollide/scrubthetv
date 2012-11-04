/**
* Social TV
* @author mail@chrisaiv.com
* 11/2/2012
*/
////////////////////////////////////////////////////////////
//Browser
////////////////////////
$(window).bind( "resize", resizeWindow );
function resizeWindow( e ) {
	var width = $(window).width();
	var height = $(window).height();

	var w, h = 0;
	//1080p: 1920x1080
	if( width >= 1920 && height >= 1080 ) w = 1920, h = 1080;
	//720p: 1280x720
	else if( width >= 1280 && height >= 720 )  w = 1280, h = 720; 
	//480p: 854x480
	else if( width >= 854 && height >=  480 )  w = 854,  h = 480;
	//360p: 640x360
	else if( width >= 640 && height >=  360 )  w = 640,  h = 360;
	//240p: 426x240
	else  w = 426,  h = 240;    

	return { width: w, height: h }
}

////////////////////////////////////////////////////////////
//Player States
////////////////////////
// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
	console.log( "TV::onPlayerError:", errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
	console.log( "TV::onPlayerStateChange:", newState );
}

// Display information about the current state of the player
function updatePlayerInfo() {
	// Also check that at least one function exists since when IE unloads the
	// page, it will destroy the SWF before clearing the interval.
	if( ytplayer && getDuration() ) {
		if( getDuration() ){
			//Announce that YouTube Video ID is ready
			socketIoSend( "videoduration", { currentTime: getCurrentTime(), duration: getDuration() } );
			stopTimer();
		}
	}
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady( id ) {
	ytplayer = document.getElementById( "ytPlayer" );
	// This causes the updatePlayerInfo function to be called every 250ms to get fresh data from the player
	startTimer( updatePlayerInfo, 250 );
	updatePlayerInfo();
	ytplayer.addEventListener( "onStateChange", "onPlayerStateChange" );
	ytplayer.addEventListener( "onError", "onPlayerError" );
	//Load an initial video into the player
	var videoId = ( id.length > 0 && id != "player1" ) ? id : "K4Zo_XizA68";
	ytplayer.loadVideoById( videoId );
	ytplayer.setPlaybackQuality( "hd720" )
}

////////////////////////////////////////////////////////////
//Player Actions
////////////////////////
function setVideoVolume( vol ) {
	// Allow the user to set the volume from 0-100
	if( ytplayer ) ytplayer.setVolume( vol );
}

function getCurrentTime(){
	if( ytplayer ) return ytplayer.getCurrentTime();
}

function getDuration(){
	if( ytplayer ) return ytplayer.getDuration();
}

function updateVideo( currentTime ){
	if( ytplayer ) ytplayer.seekTo( currentTime );
}

function playVideo() {
	if ( ytplayer ) ytplayer.playVideo();
}

function pauseVideo() {
	if ( ytplayer ) ytplayer.pauseVideo();
}

function muteVideo() {
	if( ytplayer ) ytplayer.mute();
}

function unMuteVideo() {
	if( ytplayer ) ytplayer.unMute();
}

//https://developers.google.com/youtube/js_api_reference#Functions
function loadVideo( id, start ){
	if( ytplayer ) ytplayer.loadVideoById( id, 0 );
}

////////////////////////////////////////////////////////////
//Timer
////////////////////////
function stopTimer(){
	//  clearInterval( interval );
}

function startTimer( func, millisecs ){
	setInterval( func, millisecs )
}

////////////////////////////////////////////////////////////
//Socket.io 
////////////////////////
//receievers
var socket = io.connect( "/" );
socket.on( "onVideoLoad",   loadVideo );
socket.on( "onVideoUpdate", updateVideo );
socket.on( "onVideoVolume", setVideoVolume );
socket.on( "onVideoPlay",   playVideo );
socket.on( "onVideoPause",  pauseVideo );
socket.on( "onVideoMute",   muteVideo );
socket.on( "onVideoUnmute", unMuteVideo );
//senders
function socketIoSend( event, params ){
	socket.emit( event, params, function( data ){
	}); 
}

////////////////////////////////////////////////////////////
//Constructor
////////////////////////
function loadPlayer() {
	var win = resizeWindow();
	// Lets Flash from another domain call JavaScript
	var params = { allowScriptAccess: "always" };
	// The element id of the Flash embed
	var atts = { id: "ytPlayer" };
	swfobject.embedSWF(
		"http://www.youtube.com/apiplayer?" +
		"version=3&enablejsapi=1&playerapiid=player1&fs=1",
		"videoDiv", win.width, win.height, "9", null, null, params, atts
	);
}