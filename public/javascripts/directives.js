(function() {
  var Directives;

  Directives = angular.module('directives', []);

  Directives.directive('colorSelector', [
    '$rootScope', function($rootScope) {
      return {
        restrict: 'C',
        link: function(scope, element, attrs) {
          var rgb2hex;
          rgb2hex = function(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
          };
          element.val(rgb2hex(attrs.value));
          element.miniColors({
            change: function(hex, rgb) {
              $(element).css('backgroundColor', '#' + hex);
              return scope.cambiarColor(scope.bichito, rgb);
            }
          });
          return scope.$watch('bichito', function() {
            if (element != null) {
              return element.miniColors('value', rgb2hex(attrs.value));
            }
          }, true);
        }
      };
    }
  ]);

}).call(this);
