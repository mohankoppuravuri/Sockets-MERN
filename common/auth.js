var passport = require('passport');
var auth     = {};

auth.isAuthenticated = function (req, res, next) {
	if (req.user)
		next ();

	else 
		res.redirect ('/login');
};

auth.serialize = function (user, done) {
	done(null,  user.id + '-' + user.d);
};

auth.deserialize = function (id, done) {
	let temp = id.split('-');

	done(null, {
		id     : temp[0],
		d      : temp[1],
	});
};

auth.logOut = function (req, res){
	req.logout();
	return res.redirect('/login');
};

module.exports = auth;
