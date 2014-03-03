var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyACM1"
	, { baudrate: 9600, parity: 'none' }
	// , false
);
var chr = function(n) {
	return String.fromCharCode(n);
}
var Esclavo = {};
module.exports = Esclavo;

Esclavo.apagar = function(bichito) {
	apagar = 0;
	bichito.pin = 0;

	// Encender
	serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(apagar), function(err, results) {
		if(err) {
			console.log('err ' + err);
		} else {
			bichito.pin = 1;
			serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(apagar), function(err, results) {
				if(err) {
					console.log('err ' + err);
				} else {
					bichito.pin = 2;
					serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(apagar), function(err, results) {
						if(err) {
							console.log('err ' + err);
						}
					});
				}
			});
		}
	});
};

Esclavo.encender = function(bichito) {
	// serialPort.open(function (error) {
	// 	if(!error) {
	// 		serialPort.on('data', function(data) {
	// 			console.log('data received: ' + data);
	// 		});

	// 		// Encender
	// 		serialPort.write(chr(direccion) + chr(5) + chr(0) + chr(pin) + chr(1), function(err, results) {
	// 			if(err) {
	// 				console.log('err ' + err);
	// 			} else {
	// 				console.log('resultado ' + results);
	// 				// serialPort.drain(function (err) {
	// 				// 	serialPort.close();
	// 				// });
	// 			}
	// 		});
	// 	} else {
	// 		console.log(error);
	// 	}
	// });
	encender = 1;
	bichito.pin = 0;

	// Encender
	serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(encender), function(err, results) {
		if(err) {
			console.log('err ' + err);
		} else {
			bichito.pin = 1;
			serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(encender), function(err, results) {
				if(err) {
					console.log('err ' + err);
				} else {
					bichito.pin = 2;
					serialPort.write(chr(+bichito.direccion) + chr(5) + chr(0) + chr(bichito.pin) + chr(encender), function(err, results) {
						if(err) {
							console.log('err ' + err);
						}
					});
				}
			});
		}
	});
};


Esclavo.colorear = function(direccion, pin, intensidad) {
	// serialPort.open(function () {
	// 	console.log('open pin: ', pin);
	// 	console.log('open intensidad: ', intensidad);
	// 	serialPort.on('data', function(data) {
	// 		console.log('data received: ' + data);
	// 	});

	//   // Colorear
	// 	serialPort.write(chr(direccion) + chr(6) + chr(0) + chr(pin) + chr(intensidad), function(err, results) {
	// 		console.log('err ' + err);
	// 		console.log('results ' + results);
	// 		// serialPort.close();
	// 	});
	// });

	// Colorear
	serialPort.write(chr(+direccion) + chr(6) + chr(0) + chr(+pin) + chr(+intensidad), function(err, results) {
		if(err) console.log('err ' + err);
	});
};

Esclavo.colorearBichito = function (bichito) {
	Esclavo.colorear(bichito.direccion, 0, bichito.intensidadRojo);
	Esclavo.colorear(bichito.direccion, 1, bichito.intensidadVerde);
	Esclavo.colorear(bichito.direccion, 2, bichito.intensidadAzul);
}