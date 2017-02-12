'use strict';

var Stocks = require('../models/stocks.js');


function ClickHandler () {

	this.addStockCtrl = function (req, res) {

		/*
		Stocks
			.update({stockCode:req.body.stockCode})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
		*/

		var mongo = require('mongodb').MongoClient
		mongo.connect(process.env.MONGO_URI, function(err, db) {
          if (err) throw err
          var collection = db.collection('Stocks')
          collection.save({stockCode:req.body.stockCode} , (function(err, docs) {
            if (err) throw err
            db.close()
        	res.json(docs);
          })
        )
      })
	}

	this.removeStockCtrl = function (req, res) {
/*
		Stocks
			.remove({stockCode:req.body.stockCode})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
			*/

			var mongo = require('mongodb').MongoClient
		mongo.connect(process.env.MONGO_URI, function(err, db) {
          if (err) throw err
          var collection = db.collection('Stocks')
          collection.remove({stockCode:req.body.stockCode} , (function(err, docs) {
            if (err) throw err
            db.close()
        	res.json(docs);
          })
        )
      })
	};

	this.listStockCtrl = function (req, res) {
		/*Stocks
			.find()
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
*/
		var mongo = require('mongodb').MongoClient
		mongo.connect(process.env.MONGO_URI, function(err, db) {
          if (err) throw err
          var collection = db.collection('Stocks')
          collection.find().sort({when:-1}).limit(10).toArray(function(err, docs) {
            if (err) throw err
            db.close()
        	res.json(docs);
          })
        })
	};

}

module.exports = ClickHandler;
