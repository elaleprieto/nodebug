App = angular.module('App', ['directives', 'models'])
	# , ['rutas', '$strap.directives', 'ui.bootstrap', 'fechaFilters', 'focus', 'models', 'stringFilters', 'scroll', 'ui.keypress'])
	# , ['rutas', 'directives', '$strap.directives', 'ui.bootstrap', 'fechaFilters', 'models', 'stringFilters', 'scroll', 'ui.keypress'])

# App.config ['$httpProvider', '$locationProvider', ($httpProvider, $locationProvider) ->
# 	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
# 	# $locationProvider.html5Mode(true).hashPrefix('!');
# ]

if(!('contains' in String.prototype))
  String.prototype.contains = (str, startIndex) ->
  	return -1 isnt this.indexOf(str, startIndex)
