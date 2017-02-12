'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (true || req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/addStock/')
		.post(isLoggedIn, clickHandler.addStockCtrl);

	app.route('/removeStock/')
		.post(isLoggedIn, clickHandler.removeStockCtrl);

	app.route('/listStock/')
		.get(isLoggedIn, clickHandler.listStockCtrl);
};
