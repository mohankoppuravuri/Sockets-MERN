const connection = require ('../common/db');
const schema     = require ('../schemas/user');
const db         = connection.db;

const model = db.model ('users', schema, 'users');

const mongo = {};

mongo.create = async function (data) {
	const __model = new model (data);
	const doc     = await __model.save ();

	return doc;
};

mongo.getAll = async function () {
	let filter = {};

	const res = await model.find(filter, { _id : 0, __v : 0, password : 0}, { lean: true });
	return res;
};

mongo.filterId = async function (id) {
	const res = await model.findOne({id : id}, { _id : 0, __v : 0,}, { lean: true });
	return res;
};
module.exports = mongo;
