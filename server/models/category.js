// app/models/category.js
// INITILIAZE your model here
// var User =  new Model()

// module.exports = User;

// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//  set up a mongoose model and pass it using module.exports
var categorySchema = new Schema({
	name : { type : String, required: true, unique : true }
});

// methods ======================
categorySchema.options.toJSON = {
    transform: function(doc, ret, options) {
    	var sanitized = {};

        sanitized.id = ret._id;
        sanitized.name = ret.name;

        return sanitized;
    }
};

mongoose.model('Category', categorySchema); 

//  pass model using module.exports
module.exports = mongoose.model('Category'); 