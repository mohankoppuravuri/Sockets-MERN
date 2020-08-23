const mongoose = require ('mongoose');
let db         = mongoose.connection;

function init (url) {
	return new Promise ((resolve, reject) => {
		mongoose.connect (url, 
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			});

		db.on ('error', (err) => { 
			console.log ('Connection with mongodb failed', { err });
			return reject (err); 
		});

		db.once ('open', () => {
			console.log ('Connection with mongodb successfully established.');
			return resolve ();
		});
		
		db.on ('disconnected', function () {
			console.log ('Disconnected from mongodb.');
		});

		db.on ('connected', function () {
			console.log ('Connect to mongodb ok');
		});
	});
}

module.exports = { 
	init : init,
	db   : db
};
