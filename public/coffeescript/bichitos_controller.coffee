### *******************************************************************************************************************
			Artículo
******************************************************************************************************************* ###
angular.module("App").controller 'BichitosController'
	, ['$scope', '$http', '$timeout', 'socket', 'Bichito'
		, ($scope, $http, $timeout, socket, Bichito) ->

	$scope.bichitos = Bichito.query()

	###
	 * Se calcula la Potencia a partir de la Intensidad actual.
	 * Se toma como potencia base 3 watts correspondiente a un dimmerizado de 255.
	 * Luego es una regla de tres simple. 
	###
	$scope.calculoPotencia = (intensidad) ->
		potencia = 3
		dimmer = 255
		
		return potencia * intensidad / dimmer

	# Suma de potencias individuales
	$scope.calculoPotenciaTotal = (bichito) ->
		return $scope.calculoPotencia(bichito.intensidadRojo) \
			+ $scope.calculoPotencia(bichito.intensidadVerde) \	
			+ $scope.calculoPotencia(bichito.intensidadAzul)

	$scope.cambiarColor = (bichito, colorRGB) ->
		$scope.setColor bichito, colorRGB
		$scope.$apply()
		socket.emit 'cambiarColor', bichito

	$scope.setColor = (bichito, colorRGB) ->
		bichito.intensidadRojo = colorRGB.r
		bichito.intensidadVerde = colorRGB.g
		bichito.intensidadAzul = colorRGB.b

	socket.on 'cambiarColor', (bichito) ->
		# $scope.bichitos = Bichito.query()
		angular.forEach $scope.bichitos, (element) ->
			if element._id is bichito._id
				$scope.setColor element, {r: bichito.intensidadRojo, g: bichito.intensidadVerde, b: bichito.intensidadAzul}


]