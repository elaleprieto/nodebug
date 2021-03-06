module.exports = function (servidor, cache, Bichitos){
	
	var Bichitos = require('../models/bichitos');
	var Esclavo = require('./esclavo');
	var sio = require('socket.io');
	var ws = sio.listen(servidor);

	ws.disable('log');
	// websocket, htmlfile, xhr-polling, jsonp-polling
	ws.on('connection', function (socket){
		socket.emit('ready',{title: 'Ready'});
		socket.on('imagen', function (imagen){
			cache[imagen.id] = imagen.data;
			socket.broadcast.emit('imagen', imagen);
		});
		
		socket.on('color', function (color){
			// cache[imagen.id] = imagen.data;
			console.log('Color: ', color);
			socket.broadcast.emit('color', color);
		});

		// socket.on('colorChanged', function (element, rgb){
			// console.log('Elemento: ' + element, ', Color recibido: ' + rgb);
			// socket.broadcast.emit('colorChanged', {element: element, rgb: rgb});
		// });
		socket.on('colorChanged', function(data){
			socket.broadcast.emit('colorChanged', data);

			Bichitos.edit({id: data.element
					, intensidadAzul: data.rgb.b
					, intensidadRojo: data.rgb.r
					, intensidadVerde: data.rgb.g})
		});

		socket.on('cambiarColor', function(bichito) {
			socket.broadcast.emit('cambiarColor', bichito);

			Bichitos.edit({id: bichito._id
				, intensidadAzul: bichito.intensidadAzul
				, intensidadRojo: bichito.intensidadRojo
				, intensidadVerde: bichito.intensidadVerde
			});

			// Esclavo.colorear(40, 0, bichito.intensidadRojo);
			// Esclavo.colorear(40, 1, bichito.intensidadVerde);
			// Esclavo.colorear(40, 2, bichito.intensidadAzul);
			Esclavo.colorearBichito(bichito);

		});
		
	});
};