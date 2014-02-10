(function() {
  angular.module('models', ['ngResource']).factory('Bichito', [
    '$resource', function($resource) {
      return $resource('/bichitos', {
        callback: 'JSON_CALLBACK'
      }, {
        buscar: {
          method: 'GET'
        },
        queryAll: {
          cache: true,
          method: 'GET',
          url: '/admin/articulos/index.json'
        },
        save: {
          method: 'PUT',
          url: '/articulos/:id.json'
        }
      });
    }
  ]);

}).call(this);
