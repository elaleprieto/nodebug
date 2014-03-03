(function() {
  module.exports = function(servidor, cache, Bichitos) {
    var Esclavo, sio, ws;
    Bichitos = require('../models/bichitos');
    Esclavo = require('./esclavo');
    sio = require('socket.io');
    ws = sio.listen(servidor);
    ws.disable('log');
    return ws.on('connection', function(socket) {
      socket.emit('ready', {
        title: 'Ready'
      });
      socket.on('imagen', function(imagen) {
        cache[imagen.id] = imagen.data;
        return socket.broadcast.emit('imagen', imagen);
      });
      socket.on('color', function(color) {
        console.log('Color: ', color);
        return socket.broadcast.emit('color', color);
      });
      socket.on('colorChanged', function(data) {
        socket.broadcast.emit('colorChanged', data);
        return Bichitos.edit({
          id: data.element,
          intensidadAzul: data.rgb.b,
          intensidadRojo: data.rgb.r,
          intensidadVerde: data.rgb.g
        });
      });
      socket.on('cambiarColor', function(bichito) {
        socket.broadcast.emit('cambiarColor', bichito);
        Bichitos.edit({
          id: bichito._id,
          intensidadAzul: bichito.intensidadAzul,
          intensidadRojo: bichito.intensidadRojo,
          intensidadVerde: bichito.intensidadVerde
        });
        return Esclavo.colorearBichito(bichito);
      });
      socket.on('encender', function(bichito) {
        console.log(bichito);
        socket.broadcast.emit('encender', bichito);
        return Esclavo.encender(bichito);
      });
      return socket.on('apagar', function(bichito) {
        console.log(bichito);
        socket.broadcast.emit('apagar', bichito);
        return Esclavo.apagar(bichito);
      });
    });
  };

}).call(this);
