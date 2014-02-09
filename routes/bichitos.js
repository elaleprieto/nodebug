
/*
 * GET home page.
 */
var Bichitos = require('../models/bichitos');

exports.parallax = function(req, res) {
	Bichitos.find(function (error, bichitos) {
		console.log(bichitos);
  		res.render('parallax', {title: 'Parallax', bichitos: bichitos});
	})
};