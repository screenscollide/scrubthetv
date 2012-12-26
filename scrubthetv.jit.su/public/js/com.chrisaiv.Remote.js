/*
* Description: Remote
* Modified: 12/17/12
* Created by: @chrisaiv
* Notes: 
* 
* This demo attemps to strike a balance between something that is both useful and easy-to-read.
* There are plenty of ways to make this more MVC/framework-friendly but the main goal was to 
* to capture the essence of what is possible with two screens
* 
* SocketBridge is designed to get the two screens to talk to each other
* PlaybackControls is designed to seperate GUI from controller code
* Remote is really the brains of the operation
*/
//jQuery Function that helps determin if an object exists
jQuery.fn.exists = function(){return this.length>0;}

/*
* Remote <=> TV <=> Remote <=> TV <=> etc.
*/
var SocketBridge = {
	remote: null,
	socket: null,
	hasDuration: false,
	currentTime: 0,
	initialize: function( remote ){
		this.remote = remote;
		this.socket = io.connect( "/" );
		
		this.socket.on( "onVideoDuration", function( obj ){
			//console.log( "onVideoDuration", obj.duration, "onCurrentTime", obj.currentTime );
			//Capture and store the duration of the video (only once)
			if( !SocketBridge.hasDuration ){
				var duration = obj.duration;
				SocketBridge.remote.setDuration( duration );
				SocketBridge.remote.initPlayback( );
				SocketBridge.hasDuration = true;
			}
			//Current time of video only needs to be captured in Seconds (instead of millisecs)
			var currentTime = Math.floor(obj.currentTime);
			if( currentTime > SocketBridge.currentTime ){
				SocketBridge.currentTime = currentTime;
				SocketBridge.remote.setCurrentTime( currentTime );					
			}			
		});
		this.socket.on( "SocketBridge.onVideoPlaying", function( obj ){
			console.log( "From TV::onVideoPlaying" );
		});
		this.socket.on( "SocketBridge.onVideoPaused", function( obj ){
			console.log( "From TV::onVideoPaused" );
		});		
	},
	reset: function(){
		SocketBridge.hasDuration = false;
		SocketBridge.currentTime = 0;
	},
	loadVideo: function ( id ){
		console.log( "SocketBridge.loadVideo:", id );
		this.socket.emit( "videoload", id );
		this.reset();
	},
	updateVideo: function ( currentTime ){
		console.log( "SocketBridge.setVideoUpdate:", currentTime );
		SocketBridge.socket.emit( "videoupdate", currentTime );
	},
	pauseVideo: function(){
		SocketBridge.socket.emit( "videopause" );
	},
	playVideo: function(){
		SocketBridge.socket.emit( "videoplay" );
	},
	muteVideo: function(){
		SocketBridge.socket.emit( 'videomute' );
	}, 
	unmuteVideo: function(){
		SocketBridge.socket.emit('videounmute' );
	},
	updateVolume: function( volume ){
		SocketBridge.socket.emit('videovolume', volume );
	},
	error: function( err){
		console.log( "SocketBridge.err", err )
	}
}

var PlaybackControls = {
	initialize: function( duration ){
		
		PlaybackControls.show();
		
		$( "#selections" ).change( Remote.changeVideo );
		$( "#selections" ).change( PlaybackControls.reset );
		$("#play").bind("click", Remote.playPause );
		$("#mute").bind("click", Remote.muteUnmute );
		$("#slider-vertical").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			slide: function (event, ui) {
				var volume = ui.value;
				$("#amount").val( volume );
				Remote.setVolume( volume );
			}
		});
		$("#amount").val( 60 );
		$('#slider-horizontal').slider({
			orientation: "horitonzal",
			range: "min",
			min: 0,
			max: duration,
			//		range: true,
			//		values: [0, 100],
			change: function(e, ui){
				var value = ui.value;
				var currentTime =  value;
				//console.log( "\n", "dur:", duration, "val:", value, "currTime:", currentTime, "\n" );
				Remote.updateVideo( value );
			}
		});
	},
	hide: function(){
		$( "#selections" ).hide();
		$("#play").hide();
		$("#mute").hide();
		$("#slider-vertical").hide();
		$('#slider-horizontal').hide();
	},
	show: function(){
		$( "#selections" ).show();
		$("#play").show();
		$("#mute").show();
		$("#slider-vertical").show();
		$('#slider-horizontal').show();		
	},
	reset: function(){
		$('#slider-horizontal').slider({ min: 0 });		
	}
}

var Remote = {
	initialize: function( ){
		SocketBridge.initialize( this )
	},
	initPlayback: function(){
		PlaybackControls.initialize( getDuration() );
	},
	changeVideo: function( e ){
		var videoId = $("option:selected").val()
		if( videoId != "" ) SocketBridge.loadVideo( videoId );
		
		return false;
	},
	updateVideo: function( value ){
		SocketBridge.updateVideo( value );
	},
	playPause: function ( e ) {
		e.preventDefault();
		if( $(this).hasClass("play") ){
			$(this).removeClass()
			$(this).addClass("pause")
			
			SocketBridge.pauseVideo()
		} else {
			$(this).removeClass();
			$(this).addClass("play");
			
			SocketBridge.playVideo();
		}
		return false;
	},
	muteUnmute: function ( e ) {
		if( $(this).hasClass("mute") ){
			$(this).removeClass("mute");
			$(this).addClass("unmute");

			SocketBridge.muteVideo()
		} else {
			$(this).removeClass("unmute");
			$(this).addClass("mute");

			SocketBridge.unmuteVideo()
		}
		return false;
	},
	setVolume: function ( volume ) {
		if(isNaN(volume) || volume < 0 || volume > 100) console.log("Please enter a valid volume between 0 and 100.");
		else SocketBridge.updateVolume( volume );
	},
	setCurrentTime: function ( time ){
		var currentTime = time;
		console.log( "Remote.setCurrentTime", time );
		getCurrentTime = function() {
			return currentTime;
		}	
	},
	setDuration: function ( time ){
		var duration = time;
		console.log( "Remote.setDuration", time );
		getDuration = function() {
			return duration;
		}	
	},
	reset: function(){
		console.log("Remote.reset")
	},
	error: function(err){
		console.log( "Remote.error", err );
	}
}

Remote.initialize();
PlaybackControls.hide()