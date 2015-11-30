var mongoose = require("mongoose");
var databaseConfig = {
	database : 'mongodb://localhost:27017/givingtrees_dev_db_v3'
}
module.exports = function(){
	
	return mongoose.connect(databaseConfig.database); // connect to database
}; 