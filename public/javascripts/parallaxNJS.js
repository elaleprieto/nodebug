(function() {
  var rgb2hexNode;

  jQuery(function() {
    window.App = {};
    window.App.ws = io.connect('http://localhost:3001/');
    return window.App.ws.on('colorChanged', function(data) {
      var colorBox;
      colorBox = $('.selector[data-id="' + data.element + '"] > a');
      $(colorBox).css('backgroundColor', rgb2hexNode(data.rgb.r, data.rgb.g, data.rgb.b));
      return actualizarValores($('input[id="' + data.element + '"]'), data.rgb);
    });
  });

  window.colorChange = function(element, rgb) {
    return window.App.ws.emit('colorChanged', {
      element: element,
      rgb: rgb
    });
  };

  rgb2hexNode = function(r, g, b) {
    return "#" + ("0" + parseInt(r, 10).toString(16)).slice(-2) + ("0" + parseInt(g, 10).toString(16)).slice(-2) + ("0" + parseInt(b, 10).toString(16)).slice(-2);
  };

}).call(this);
