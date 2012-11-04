/************************************************
* Title: scrubthetv.jit.su
* Desc: Allow your iPhone/iPod/Playbook to control the video screen
* Modified: 
* Notes:
* Simply visit http://scrubthetv.jit.su
* 
* GoogleTV user agent strings
* http://www.georgepaterson.com/2010/11/04/google-tv-user-agent-strings/
* 
* Designing for Google Tv
* https://developers.google.com/tv/web/docs/design_for_tv
* 
* jQuery KEyboard Navication Plugin
* http://mike-hostetler.com/jquery-keyboard-navigation-plugin
*
************************************************/

var express = require('express')
  , routes  = require('./routes')
  , remote  = require('./routes/remote')
  , tv      = require('./routes/tv')
  , http    = require('http')
  , path    = require('path');

var app = express();

app.configure(function(){
  app.locals.pretty = true;
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/',       routes.index);
app.get('/tv',     tv.list);
app.get('/remote', remote.list);

var server = http.createServer(app);
server.listen( app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Socket.io
var socket = require( process.cwd() + "/lib/Socket.js" );
	socket.init( server );