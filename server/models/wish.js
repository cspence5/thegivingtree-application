// app/models/wish.js
// app/models/wish.js
// INITILIAZE your model here
// var User =  new Model() 

// module.exports = User;

// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//  set up a mongoose model and pass it using module.exports
var wishSchema = new Schema({
	name : { type : String, required: true, unique : false },
    picture : { type : String },
    url : { type : String },
	date_created : { type : Date, default : Date.now}, 
	date_modified : { type : Date},
    status : {type : String, required : true, default : 'available'},
}).index({
      'name':'text'
    });

// methods ======================
wishSchema.options.toJSON = {
    transform: function(doc, ret, options) {
    	var sanitized = {};

        sanitized.id = ret._id;
        sanitized.name = ret.name;
        sanitized.picture = ret.picture;
        sanitized.url = ret.url;
        sanitized.date_created = ret.date_created;
        sanitized.date_modified = ret.date_modified;

        return sanitized;
    }
};

mongoose.model('Wish', wishSchema); 

//  pass model using module.exports
module.exports = mongoose.model('Wish'); 