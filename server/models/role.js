// app/models/role.js
// INITILIAZE your model here
// var User =  new Model()

// module.exports = User;

// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//  set up a mongoose model and pass it using module.exports
var roleSchema = new Schema({
	name : { type : String, required: true, unique: true }
});

// methods ======================
roleSchema.options.toJSON = {
    transform: function(doc, ret, options) {
    	var sanitized = {};

        sanitized.id = ret._id;
        sanitized.name = ret.name;

        return sanitized;
    }
};

mongoose.model('Role', roleSchema); 

//  pass model using module.exports
module.exports = mongoose.model('Role'); 