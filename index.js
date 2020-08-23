let http             = require ('http');
let path             = require ('path');
let redis            = require ('redis');
let express          = require ('express');
let passport         = require ('passport');
let bodyParser       = require ('body-parser');
let cookieParser     = require ('cookie-parser');
let session          = require ('express-session');
let e_logger         = require ('express-bunyan-logger');
let local_strategy   = require ('passport-local').Strategy;
let redis_store      = require ('connect-redis')(session);

let mongoose         = require ('./common/db');
let auth             = require ('./common/auth');
let login            = require ('./routes/login');
let strategy		 = require ('./controllers/strategy');
let user	     	 = require ('./controllers/user');
let dataCollection 	 = require ('./controllers/data');

var app              = express();
const mongo_url      = 'mongodb://localhost:27017/rsocket?maxPoolSize=10';

let redisClient = redis.createClient ();
var sess        = {
	cookie            : { 
		secure : true,
		maxAge : 24 * 60 * 60 * 1000, // This is in milliseconds
	},
	proxy             : true,
	secret            : 'Hi This is Mohan',
	saveUninitialized : false,
	store             : new redis_store ({ client: redisClient, ttl:24*60*60 }),
	resave            : true,	
	name              : 'app.socket',
};

/* Add express request logger */
app.use( e_logger({
	format: "HTTP :incoming :status-code :method :url :remote-address",
	excludes : [ 'req' , 'res', 'req-headers', 'res-headers', 'user-agent',
		'body', 'short-body', 'response-hrtime', 'http-version',
		'incoming', 'remote-address', 'method', 'url', 'status-code', 'ip'
	],
	levelFn : function (status) {
		if (status >= 500)
			return 'error';
		if (status >= 400)
			return 'warn';
	},
}));

app.use( cookieParser() );
app.use( bodyParser.json ({ limit: '50mb' }) );
app.use( bodyParser.urlencoded ({ extended: false }) );
app.use( session ( sess ) );

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( 'local', new local_strategy( strategy.local ));

passport.serializeUser( auth.serialize );
passport.deserializeUser( auth.deserialize );

app.use('/login', express.static (__dirname + '/react_apps/login/build'), (req, res) => {
	return res.sendFile(path.join(__dirname + '/react_apps/login', 'build', 'index.html'));
});

app.use('/app', auth.isAuthenticated, express.static (__dirname + '/react_apps/app/build'), (req, res) => {
	return res.sendFile(path.join(__dirname + '/react_apps/app', 'build', 'index.html'));
});
app.post('/auth', login);
app.get ('/getUserName', user.getUserName);
app.get('/logout', auth.logOut); 

app.set('port', 7777);
let server = http.createServer(app);
let io     = require('socket.io')(server);

io.on ('connection', function(client) {

	client.on ('getAllUser', async ( ) => { client.emit ('allUsers', await user.getAllUsers ()) } );
	client.on ('getAllForms', async (data) => { 
		client.join (data.group); 
		client.join (data.id); 
		client.emit ('getAllForms', await dataCollection.getUserSpecific (data.id, data.group));
	});

	client.on ('submitForm', async (data) => { 
		let submitterData = await dataCollection.pending (data);
		client.emit ('getAllForms', await dataCollection.getUserSpecific (data.submittedBy, data.senderGroup));
		client.emit ('clearForm'); 
		io.sockets.in (data.receiverGroup).emit ('groupUpdated', {...submitterData, status : 'pending'});
	});

	client.on ('approve',  async (data) => { 	
		let submittersData = await dataCollection.accept (data._id, data.submittedBy, data.senderGroup)
		io.sockets.in(data.submittedBy).emit ('getAllForms', submittersData, {...data, status : 'approved'});
		io.sockets.in(data.receiverGroup).emit ('groupUpdated');
	});

	client.on ('reject',  async (data) => { 
		let submittersData = await dataCollection.reject (data._id, data.submittedBy, data.senderGroup)
		io.sockets.in(data.submittedBy).emit ('getAllForms', submittersData,  {...data, status : 'rejected'});
		io.sockets.in(data.receiverGroup).emit ('groupUpdated');
	});

});

server.listen(7777);

let init = async () => {
	console.log('...');
	await mongoose.init (mongo_url); 
	console.log('Success');
}

init();
