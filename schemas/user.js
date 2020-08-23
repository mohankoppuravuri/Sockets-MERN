const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema ({
	id           : { type : String, required : true, index : { unique: true }, lowercase : true },
	password     : { type : String },
	group        : { type : String, enum : [ 'health', 'police', 'railway', 'politician' ] }
});

module.exports = schema;
