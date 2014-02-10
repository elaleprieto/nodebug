# Conexión con server nodejs
# App.ws = io.connect('http://localhost:3001/')

# Conexión con server nodejs (Angular way)
# App.factory 'socket', ['$rootScope', ($rootScope) ->
angular.module("App").factory 'socket', ['$rootScope', ($rootScope) ->
	
	socket = io.connect('http://localhost:3001/')
	# socket = io.connect('http://node01.com:3001/')
	# socket = io.connect('http://elefe.com:3001/')
	# socket = io.connect('http://192.168.40.2:3001/')
	
	
	on: (eventName, callback) ->
		socket.on eventName, () ->
			args = arguments
			$rootScope.$apply () ->
				callback.apply(socket, args)

	emit: (eventName, data, callback) ->
		socket.emit eventName, data, () ->
			args = arguments
			$rootScope.$apply () ->
				if (callback)
					callback.apply(socket, args)
	]