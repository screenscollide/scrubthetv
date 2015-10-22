[http://scrubthetv.nodejitsu.com/](http://scrubthetv.nodejitsu.com/)
=

Control your desktop or large screen browser using a mobile device.
- 
- Full Javascript stack using ExpressJS, socket.io, and jQuery
- Just point your largescreen and mobile browsers to the same URL to get started
- Ideas/Comments/Suggestions are welcomed [mail@chrisaiv.com](mail@chrisaiv.com)

Resources
-
1. [http://addyosmani.github.com/jquery-ui-bootstrap/](http://addyosmani.github.com/jquery-ui-bootstrap/)
2. [https://developers.google.com/youtube/js_api_reference#GettingStarted](https://developers.google.com/youtube/js_api_reference#GettingStarted)
3. [https://code.google.com/apis/ajax/playground/?exp=youtube#polling_the_player](https://code.google.com/apis/ajax/playground/?exp=youtube#polling_the_player)
4. [http://jqueryui.com/demos/slider/](http://jqueryui.com/demos/slider/)
5. [https://developers.google.com/youtube/youtube_player_demo](https://developers.google.com/youtube/youtube_player_demo)
6. [http://custom-drupal.com/jquery-demo/jyoutube](http://custom-drupal.com/jquery-demo/jyoutube)
7. [http://www.georgepaterson.com/2010/11/04/google-tv-user-agent-strings/](http://www.georgepaterson.com/2010/11/04/google-tv-user-agent-strings/)
8. [https://developers.google.com/tv/web/docs/design_for_tv](https://developers.google.com/tv/web/docs/design_for_tv)
9. [http://mike-hostetler.com/jquery-keyboard-navigation-plugin](http://mike-hostetler.com/jquery-keyboard-navigation-plugin)

Special Notes
-
You may need this when deploying on AWS
```sh
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080
```
Author
-
- Chris Mendez | [@chrismendezinla](http://twitter.com/chrismendezinla)


License
-
MIT
