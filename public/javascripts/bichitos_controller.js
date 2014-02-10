
/* *******************************************************************************************************************
			Artículo
*******************************************************************************************************************
 */

(function() {
  angular.module("App").controller('BichitosController', [
    '$scope', '$http', '$timeout', 'socket', 'Bichito', function($scope, $http, $timeout, socket, Bichito) {
      $scope.bichitos = Bichito.query();

      /*
      	 * Se calcula la Potencia a partir de la Intensidad actual.
      	 * Se toma como potencia base 3 watts correspondiente a un dimmerizado de 255.
      	 * Luego es una regla de tres simple.
       */
      $scope.calculoPotencia = function(intensidad) {
        var dimmer, potencia;
        potencia = 3;
        dimmer = 255;
        return potencia * intensidad / dimmer;
      };
      $scope.calculoPotenciaTotal = function(bichito) {
        return $scope.calculoPotencia(bichito.intensidadRojo) + $scope.calculoPotencia(bichito.intensidadVerde) + $scope.calculoPotencia(bichito.intensidadAzul);
      };
      $scope.cambiarColor = function(bichito, colorRGB) {
        $scope.setColor(bichito, colorRGB);
        $scope.$apply();
        return socket.emit('cambiarColor', bichito);
      };
      $scope.setColor = function(bichito, colorRGB) {
        bichito.intensidadRojo = colorRGB.r;
        bichito.intensidadVerde = colorRGB.g;
        return bichito.intensidadAzul = colorRGB.b;
      };
      return socket.on('cambiarColor', function(bichito) {
        return angular.forEach($scope.bichitos, function(element) {
          if (element._id === bichito._id) {
            return $scope.setColor(element, {
              r: bichito.intensidadRojo,
              g: bichito.intensidadVerde,
              b: bichito.intensidadAzul
            });
          }
        });
      });
    }
  ]);

}).call(this);
