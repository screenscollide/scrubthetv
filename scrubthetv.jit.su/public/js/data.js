/**
 * Data Loader
 * @author mail@chrisaiv.com
 * 11/2/2012
*/

////////////////////////////////////////////////////////////
//Video Drop Down
////////////////////////
$.extend({
	getUrlVars: function( url ){
		var vars = [], hash;
		var hashes = url.slice(url.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(url, name){
		return $.getUrlVars( url )[name];
	}
});

//Get params allow us to easily construct urls using object
function getParams( object ){
	var string = "";		
	$.each( object, function( n, value){
		var param =  n + "=" + value + "&";
		string += param;
	});
	return string
}
function onYouTubeFeed( e ){
	console.log( "onYouTubeFeed:", e );
}

function feed( data ){
	console.log( "Data::feed:", data );
	var listItems = [];
	var arr = data.feed.entry;
	$.each( data.feed.entry, function( idx, value ){
		//Get rid of the trailing characters
		var ytId = $.getUrlVar( value.link[0].href, "v");
		var ytTitle = value.title.$t;
		//console.log( $("<option />").val( ytId ).text( ytTitle ) );
		var html = '<option value="' + ytId + '">' + ytTitle + '</option>';
		listItems.push( html );
	});
	$("#videos").html( listItems.join('') );
	//Reveal the dropdown menu w/ video selections
	$("#selections").show();
}

////////////////////////////////////////////////////////////
//https://developers.google.com/youtube/2.0/reference
////////////////////////
function loadFeed( ){
	var params = { alt: "json", callback: "feed" };
	var path = "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?" + getParams( params );

	//https://developers.google.com/youtube/2.0/developers_guide_protocol_movies_and_shows
	var params = { "v": 2, "max-results": 10, "paid-content": false, "hl": "en", alt: "json" }
	var path = "https://gdata.youtube.com/feeds/api/charts/movies/trending?" + getParams( params );
	$.getJSON( path, feed )
}
