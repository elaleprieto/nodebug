var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var objectId = {};
var Bichitos = {};
var SUS = {};
var schema = {};

// Base de datos MongoDB
mongoose.connect('mongodb://localhost/bichitos', function (error) {
	if (!error) {
		schema = mongoose.Schema;
		objectId = schema.ObjectId;
		Bichitos = new schema({
			orden: String,
			direccion: String,
			estado: String,
			intensidadAzul: String,
			intensidadRojo: String,
			intensidadVerde: String
		});

		Bichitos = mongoose.model('bichitos', Bichitos);


		console.log('Conectado a MongoDB');
	} else {
		throw error;
	}
})

module.exports = Bichitos;

// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

// var dPort = 27017;
// var dHost = "localhost";
// var dName = "video5";

// var SUS = {};

// SUS.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
// SUS.db.open(function(e,d){
// 	if(e){
// 		console.log(e)
// 	}else{
// 		console.log("Conectado a la base de datos: "+dName);
// 	}
// });

// SUS.subscriptors = SUS.db.collection('subscriptors');

// module.exports = SUS;

SUS.new = function(newData, callback){
	SUS.subscriptors.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			SUS.subscriptors.insert(newData, callback(null))
		}
	})
}

Bichitos.find = function(callback){
	Bichitos.find({}, function (error, bichitos) {
		console.log(bichitos);
		if(error){
			callback(error)
		}else{
			callback(null, bichitos)
		}
	});
}

Bichitos.edit = function(dataBichito, callback){
	Bichitos.findById(dataBichito.id, function (error, bichito) {
		bichito.intensidadAzul = dataBichito.intensidadAzul;
		bichito.intensidadRojo = dataBichito.intensidadRojo;
		bichito.intensidadVerde = dataBichito.intensidadVerde;
		bichito.save(function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
	// Bichitos.findByIdAndUpdate({_id: new ObjectId(nuevoBichito.id)}, {intensidadAzul:'300'}, callback);
	// Bichitos.find({_id: new ObjectId(bichito.id)}, {intensidadAzul:'1833'}, { upsert: true }, callback);
	
	
}

SUS.delete = function(id, callback){
	SUS.subscriptors.remove({_id: this.getObjectId(id)},callback)
}


SUS.getObjectId = function(id){
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id)
}



