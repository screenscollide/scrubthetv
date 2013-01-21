/*
 * name: JSON Util
 * Desc: AJAX Request
 * Date Modified: 11/4/12
 * 
 */

var http    = require("https")
  , req     = null
  , data    = null
  , onData  = null
  , onEnd   = null

exports.init = function(){
}

exports.getJSON = function( options, func1, func2 ){
  req = http.get( options, this.onCompleteHandler );
  onData = func1;
  onEnd = func2;
}

exports.onCompleteHandler = function ( res ){
  res.setEncoding("utf8");
  res.on( "data",  onData )
  res.on( "error", onError );
  res.on( "close", onClose )
  res.on( "end",   onEnd )
}

function onError( error ){
  console.log( "Error: " + error.message );  
}

function onClose( e ){
}


/**********************************
Getters / Setters
**********************************/
exports.getDB = function(){
  return db;
}