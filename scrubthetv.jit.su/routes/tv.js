
/*
* GET users listing.
*/

exports.list = function(req, res){
	var userAgent   = req.headers["user-agent"];
	var screenSm  = /(iP(hone|od)|PlayBook)/i;
	var screenLg = /iP(ad|Large Screen|GoogleTV|Boxee|roku)/i;
	
	if( userAgent.match( screenSm ) ){//|| userAgent.match(/Chrome/g) ){
		res.redirect('/remote');
	} else if( userAgent.match( screenLg ) || userAgent.match(/firefox|Safari/i) ){
		res.render('tv', { title: 'TV' } );
	}
};