/**
 * YouTubeTrending
 * @author mail@chrisaiv.com
 * Modiied: 12/26/2012
 * Notes:
 * Begin the development of a YouTube data feed class. This model 
 *   will continue to grow as needed.
*/

var YouTubeTrending = {
	dropDownMenu: "#selections",
	
	//https://developers.google.com/youtube/2.0/reference
	initialize: function(){
		var params = { alt: "json", callback: "feed" };
		var path = "http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?" + YouTubeTrending.getParams( params );

		//https://developers.google.com/youtube/2.0/developers_guide_protocol_movies_and_shows
		var params = { "v": 2, "max-results": 10, "paid-content": false, "hl": "en", alt: "json" }
		var path = "https://gdata.youtube.com/feeds/api/charts/movies/trending?" + YouTubeTrending.getParams( params );
		$.getJSON( path, YouTubeTrending.onComplete )		
	},
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
		return YouTubeTrending.getUrlVars( url )[name];
	},
	//Get params allow us to easily construct urls using object
	getParams: function ( object ){
		var string = "";		
		$.each( object, function( n, value){
			var param =  n + "=" + value + "&";
			string += param;
		});
		return string
	},
	onComplete: function ( data ){
		//console.log( "YouTubeTrending.onComplete", data );
		var listItems = [];
		var arr = data.feed.entry;
		
		$.each( data.feed.entry, function( idx, value ){
			//Get rid of the trailing characters
			var ytId = YouTubeTrending.getUrlVar( value.link[0].href, "v");
			var ytTitle = value.title.$t;
			var html = '<option value="' + ytId + '">' + ytTitle + '</option>';
			listItems.push( html );
		});
		
		$( YouTubeTrending.dropDownMenu ).append( listItems.join('') );
	}
}