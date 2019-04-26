'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


var connectCounter = 0;
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.get('/', function(req, res) {  
    res.json({Ok: 'websocket server'});
});

server.listen(8080,  function () {
	console.log('socket IO listening on port ' + 8080 + '...');
});;  

io.on('connection', function(socket) {  
	 connectCounter++;
    //socket.emit('announcements', { message: 'server update' });

    socket.on('client update', function () {
    	console.log('server sent update to client via announcements');
    	socket.broadcast.emit('announcements', { message: 'server update' });
  	});

	  socket.on('disconnect', function () {
	  	 connectCounter--;
	  	console.log('one user disconnectted');
	  });

	//setInterval(function(){console.log( connectCounter);} , 3000);  

});
/*

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

*/
