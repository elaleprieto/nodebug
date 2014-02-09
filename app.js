
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , bichitos = require('./routes/bichitos')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var websockets = require('./lib/ws');
var cache = {};
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos MongoDB
mongoose.connect('mongodb://localhost/bichitos', function (error) {
	if (!error) {
		console.log('Conectado a MongoDB');
	} else {
		throw error;
	}
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/parallax', bichitos.parallax);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor Express escuchando en el puerto ' + app.get('port'));
  websockets(this, cache);
});
