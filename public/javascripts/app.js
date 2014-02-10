(function() {
  var App,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  App = angular.module('App', ['directives', 'models']);

  if (!(__indexOf.call(String.prototype, 'contains') >= 0)) {
    String.prototype.contains = function(str, startIndex) {
      return -1 !== this.indexOf(str, startIndex);
    };
  }

}).call(this);
