const users      = require ('../models/users');
const strategy   = {};

strategy.getAllUsers = async  () =>  {
	try {
		let document = await users.getAll ();
		return document;
	} catch (err) {	
	}
};

strategy.getUserName = async  (req, res) =>  {
	try {
		
		let document = await users.filterId (req.user.id);
		res.send (document);
	} catch (err) {	
	}
};
module.exports = strategy;
