// Required Modules


var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 4000;

	

exports.start = function () {





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
app.listen(port, process.env.IP,function () {
    console.log( "[CLIENT] Express server listening on port " + port);
});

};