Directives = angular.module('directives', [])

Directives.directive 'colorSelector', ['$rootScope', ($rootScope) ->
	return {
		restrict: 'C',
		link: (scope, element, attrs) ->

			rgb2hex = (rgb) ->
				rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
				return "#" \
					+ ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) \
						+ ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) \
							+ ("0" + parseInt(rgb[3],10).toString(16)).slice(-2)

			element.val(rgb2hex(attrs.value))

			element.miniColors({
				change : (hex, rgb) ->
					$(element).css('backgroundColor', '#' + hex);
					# cambiarColor(element, rgb);
					scope.cambiarColor(scope.bichito, rgb)
					# scope.socket.emit 'cambiarColor', scope.bichito, rgb
			})

			scope.$watch 'bichito', ->
				if element?
					element.miniColors('value', rgb2hex(attrs.value))
			, true

	}
]