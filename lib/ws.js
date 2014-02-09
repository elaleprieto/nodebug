module.exports = function (servidor, cache){
  
  var sio = require('socket.io');
  var ws = sio.listen(servidor);

  ws.disable('log');
  // websocket, htmlfile, xhr-polling, jsonp-polling
  ws.on('connection', function (socket){
    socket.emit('ready',{title: 'Ready'});
    socket.on('imagen', function (imagen){
      cache[imagen.id] = imagen.data;
      socket.broadcast.emit('imagen', imagen);
    });
    
    socket.on('color', function (color){
      // cache[imagen.id] = imagen.data;
      console.log('Color: ', color);
      socket.broadcast.emit('color', color);
    });

    // socket.on('colorChanged', function (element, rgb){
      // console.log('Elemento: ' + element, ', Color recibido: ' + rgb);
      // socket.broadcast.emit('colorChanged', {element: element, rgb: rgb});
    // });
    socket.on('colorChanged', function(data){
      console.log(data);
      socket.broadcast.emit('colorChanged', data);
    });
    
  });
};