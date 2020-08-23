const connection = require ('../common/db');
const schema     = require ('../schemas/data');
const db         = connection.db;

const model = db.model ('data', schema, 'data');

const mongo = {};

mongo.create = async function (data) {

	const __model = new model (data);
	const doc     = await __model.save ();

	return doc.toJSON();
};

mongo.getAll = async function () {
	let filter = {};

	const res = await model.find(filter, {__v: 0}, { lean: true });
	return res;
};

mongo.filterId = async function (id) {
	let filter = {};
	console.log('Id', id);
	filter = { 
		id       : id 
	};

	const res = await model.findOne(filter, { __v : 0 }, { lean: true });
	return res;
};

mongo.update = async function (_id, status) {
	let filter = { _id : _id};

	const res = await model.findOneAndUpdate(filter, { status: status}, { lean: true });
	return res;
};
module.exports = mongo;
