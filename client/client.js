// Required Modules




	

exports.start = function () {

var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = 4000;



//app.use( express.static( __dirname + '/') );
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.setHeader('Access-Control-Allow-Origin', 'https://givingtrees.herokuapp.com/*');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next(); 
  }
});


app.use(morgan("dev"));
//app.use(express.static("./app"));
//app.use(express.static("./"));
app.use(express.static( __dirname));
app.get("/", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile("index.html");
    res.sendFile('/index.html');
   // res.sendFile('index.html', { root: __dirname });
});




// Start Server
app.listen(4000,'50.19.209.3' ,function () {
    console.log( "[CLIENT] Express server listening on port " + process.env.IP  + port);
});

};