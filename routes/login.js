var express  = require('express');
var passport = require('passport');
var router   = express.Router();

const auth = (req, res, next) => {

	passport.authenticate ('local', function (err, user, info) {
		if (err) {
			return res.send({
				message : 'Internal Error Please Try after some time.',
			});
		}
		if (!user) {
			return res.send({ 
				message       : info.message,
				authenticated : false
			});
		}

		req.logIn(user, function (err) {
			if (err) {
				console.log ('Error while trying to login with passport', _err);
				return next(err);
			}
			return res.send ({
				authenticated: true
			});
		});

	})(req, res, next);
};


module.exports = auth;
