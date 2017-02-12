'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stocks = new Schema({
	stockCode:String
});

module.exports = mongoose.model('Stocks', Stocks);

