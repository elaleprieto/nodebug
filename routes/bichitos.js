
/*
 * GET home page.
 */
var Bichitos = require('../models/bichitos');



exports.accionar = function(req, res) {
	Bichitos.find(function (error, bichitos) {
  		res.render('bichitos/accionar', {title: 'Listado', bichitos: bichitos});
	})
};

exports.index = function(req, res) {
	Bichitos.find(function (error, bichitos) {
  		res.render('bichitos/index', {title: 'Listado', bichitos: bichitos});
	})
};

exports.list = function(req, res) {
	Bichitos.find(function (error, bichitos) {
  		res.send(bichitos);
	})
};

exports.parallax = function(req, res) {
	Bichitos.find(function (error, bichitos) {
  		res.render('parallax', {title: 'Parallax', bichitos: bichitos});
	})
};