const users      = require ('../models/users');
const strategy   = {};

strategy.local = async function (name, password, done) {
	try {
		let document = await users.filterId (name.trim());

		if (password !== document.password) {
			return done (null, false, { message: 'Wrong credentials. Try again.' });
		}

		let d = new Date();

		done(null, {
			id     : document.id,
			d      : d.toISOString()
		});
	} catch (err) {	
		return done(err, null);
	}
};

module.exports = strategy;
