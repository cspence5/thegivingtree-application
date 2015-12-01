var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var host = 'localhost';
host = '10.99.21.59';
//4000
//3000
// =========== DATABASE CONFIG ==========================//
//mongoose.connect('mongodb://localhost:27017/givingtrees_dev_db_v3'); // connect to database
//mongoose.connect('mongodb://10.99.21.59:27017/givingtrees_dev_db_v3'); // connect to database
// =========== [END] DATABASE CONFIG ==========================//

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next(); 
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);


  res
  .status(404)
  .json({ 
    status : 404,
    error_message : 'Not Found'
  });
}); 

// Start the server
app.set('port', process.env.PORT || 3000);

//console.log(process.env.PORT);


/**
 database server 
 server.js 
 client.js
 
 **/

var server = app.listen(4000 || 3000, 'https://givingtrees.herokuapp.com/', function() {
  var addr = server.address();
  console.log("listening at", addr.address + ":" + addr.port);
  //console.log('[SERVER] Express server listening on port ' + server.address() +  server.address().port);
})



var clientServer = require('../client/client.js');
clientServer.start();

var databaseServer = require( __dirname + '/config/database.js');
databaseServer.start(); 

