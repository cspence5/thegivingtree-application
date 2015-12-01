var mongoose = require("mongoose");
var express    = require("express");
var databaseConfig = {
//	database : "mongodb://" + process.env.IP + "/givingtrees_dev_db_v3"
	database : "mongodb://system:dragon27@ds059634.mongolab.com:59634/heroku_0n18t5b0"
}
exports.start = function(){
	
	return mongoose.connect(databaseConfig.database); // connect to database
}; 

/**
//lets require/import the mongodb native drivers.
var mongodb = require('mongoose');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://' + process.env.IP + '/givingtrees_dev_db_v3';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
  }); **/