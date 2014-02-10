
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , bichitos = require('./routes/bichitos')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  // , mongoose = require('mongoose');

// Variables
var cache = {};
// var objectId = {};
// var Bichitos = {};
// var schema = {};
var websockets = require('./lib/ws');

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
// mongoose.connect('mongodb://localhost/bichitos', function (error) {
// 	if (!error) {
// 		schema = mongoose.Schema;
// 		objectId = schema.ObjectId;
// 		Bichitos = new schema({
// 			orden: String,
// 			direccion: String,
// 			estado: String,
// 			intensidadAzul: String,
// 			intensidadRojo: String,
// 			intensidadVerde: String
// 		});

// 		Bichitos = mongoose.model('bichitos', Bichitos);

// 		console.log('Conectado a MongoDB');
// 	} else {
// 		throw error;
// 	}
// })

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.disable('view cache');
app.set('view cache', 'disable');
app.set('view cache', false);

app.get('/', bichitos.index);
app.get('/bichitos', bichitos.list);
app.get('/parallax', bichitos.parallax);
// app.get('/parallax', function(req, res) {
// 	Bichitos.find({}, function (error, bichitos) {
//   		res.render('parallax', {title: 'Parallax', bichitos: bichitos});
// 	});
// });
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor Express escuchando en el puerto ' + app.get('port'));
  websockets(this, cache);
});
