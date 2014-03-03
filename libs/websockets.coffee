module.exports = (servidor, cache, Bichitos) ->
	
	Bichitos = require('../models/bichitos')
	Esclavo = require('./esclavo')
	sio = require('socket.io')
	ws = sio.listen(servidor)

	ws.disable('log')
	# websocket, htmlfile, xhr-polling, jsonp-polling
	ws.on 'connection', (socket) ->
		socket.emit('ready',{title: 'Ready'})
		socket.on 'imagen', (imagen) ->
			cache[imagen.id] = imagen.data
			socket.broadcast.emit('imagen', imagen)
		
		socket.on 'color', (color) ->
			# cache[imagen.id] = imagen.data
			console.log('Color: ', color)
			socket.broadcast.emit('color', color)

		# socket.on('colorChanged', function (element, rgb){
			# console.log('Elemento: ' + element, ', Color recibido: ' + rgb)
			# socket.broadcast.emit('colorChanged', {element: element, rgb: rgb})
		# })
		socket.on 'colorChanged', (data) ->
			socket.broadcast.emit('colorChanged', data)

			Bichitos.edit({id: data.element
					, intensidadAzul: data.rgb.b
					, intensidadRojo: data.rgb.r
					, intensidadVerde: data.rgb.g})

		socket.on 'cambiarColor', (bichito) ->
			socket.broadcast.emit('cambiarColor', bichito)

			Bichitos.edit({id: bichito._id
				, intensidadAzul: bichito.intensidadAzul
				, intensidadRojo: bichito.intensidadRojo
				, intensidadVerde: bichito.intensidadVerde
			})

			# Esclavo.colorear(40, 0, bichito.intensidadRojo)
			# Esclavo.colorear(40, 1, bichito.intensidadVerde)
			# Esclavo.colorear(40, 2, bichito.intensidadAzul)
			Esclavo.colorearBichito(bichito)

		socket.on 'encender', (bichito) ->
			console.log bichito
			socket.broadcast.emit('encender', bichito)

			Esclavo.encender(bichito)


		socket.on 'apagar', (bichito) ->
			console.log bichito
			socket.broadcast.emit('apagar', bichito)

			Esclavo.apagar(bichito)


