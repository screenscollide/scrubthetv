/** -----------------------------------------------------------
* Global Helper Functions
* -----------------------------------------------------------
* Description: 
* - ---------------------------------------------------------
* Created by: chrisaiv@gmail.com
* Modified by: 
* Date Modified: June 26, 2009
* - ---------------------------------------------------------
* Copyright 2009
* - ---------------------------------------------------------
*
*/

function trace(text) {
    $('#console').append('<div>'+text+'</div>');
}

function includeFooter( date ){

	var now = date;
	var testPatterns = [
		'yyyy','yy','MMMM','MMM','MM','M','dd','d','EEEE','EEE','a',
		'HH','H','hh','h','mm','m','ss','s','S',
		'EEEE MMMM, d yyyy hh:mm:ss.S a',
		'M/d/yy HH:mm'
	];
	$("footer span").append( $.formatDate( now, 'yyyy' ) );	
}

function getFlashMovie(movieName) {
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}

function resizeWindow( e ) {
	var newWindowWidth = $(window).width() - 15;
	var newWindowHeight = $(window).height() - 25;
	//console.log( newWindowWidth + " " + newWindowHeight );

	if( getFlashMovie("swfContainer") ){
		//getFlashMovie("swfContainer").sendCanvasParamsFromJavascript( newWindowWidth, newWindowHeight );						
	}
}

includeFooter( new Date() );

//Navigation Highlighter
//http://stackoverflow.com/questions/303956/jquery-select-a-which-href-contains-some-string
switch( window.location.pathname ){
	case "/remote":
	$('ul.nav a[href$="/tv"]').parent().addClass("active");
	break;
	default:
	$('ul.nav a[href$="' + window.location.pathname + '"]').parent().addClass("active");
}
