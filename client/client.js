// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 4000;

app.use(morgan("dev"));
//app.use(express.static("./app"));
app.use(express.static("./"));

app.get("/", function(req, res) {
    //res.sendFile("./app/index.html");
    res.sendFile("./index.html");
});

// Start Server
app.listen(port, function () {
    console.log( "[CLIENT] Express server listening on port " + port);
});