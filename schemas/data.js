const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema ({
	message        : { type : String },
	status         : { type : String, enum : ['pending', 'accepted', 'rejected']},
	submittedBy    : { type : String },
	submittedTo    : { type : String },
	senderGroup    : { type : String },
	receiverGroup  : { type : String },
});

module.exports = schema;
