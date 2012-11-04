
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.render('remote', { title: 'Remote' });
};