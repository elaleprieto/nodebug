angular.module('models', ['ngResource'])
	
	# Bichito
	.factory('Bichito', ['$resource', ($resource) ->
		$resource '/bichitos'
			, { callback:'JSON_CALLBACK' }
			, buscar: {method:'GET'}
				, queryAll: {cache:true, method:'GET', url:'/admin/articulos/index.json'}
				, save: {method:'PUT', url:'/articulos/:id.json'}
	])