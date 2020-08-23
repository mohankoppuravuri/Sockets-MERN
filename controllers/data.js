const dataModel     = require ('../models/data');
const strategy   = {};

strategy.getUserSpecific = async  (id, group) =>  {
	try{
		let document = await dataModel.getAll ();
		document = document.filter (record => {
		if ( (record.submittedBy === id) || (record.receiverGroup === group && record.status === 'pending') )
			return true;
		return false;
		});
		return document;
	}catch (err) {
		console.log(err);
	}
};


strategy.getAllData = async  () =>  {
	try {
		let document = await dataModel.getAll ();
		return document;
	} catch (err) {	
		console.log(err);
	}
};

strategy.accept = async (_id, id, group) =>  {
	try {
		await dataModel.update(_id, 'accepted');
		return (await strategy.getUserSpecific (id, group));
	} catch (err) {	

		console.log(err);
	}
};

strategy.reject = async (_id, id, group) =>  {
	try {
		await dataModel.update(_id, 'rejected');
		return (await strategy.getUserSpecific (id, group))
		
	} catch (err) {	
		console.log(err);
	}
};

strategy.pending = async  (data) =>  {
	try {
		let document = await dataModel.create (data);
		return document;
	} catch (err) {	
		console.log(err);
	}
};

module.exports = strategy;
