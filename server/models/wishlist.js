// app/models/wishlist.js
// INITILIAZE your model here
// var User =  new Model()

// module.exports = User;

// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Wish = require('./wish').schema;  
var User = require('./user').schema; 
var Category = require('./category').schema;
 
//  set up a mongoose model and pass it using module.exports
var wishlistSchema = new Schema({
	name : { type : String, required: true },
	description : { type : String },
    picture : { type : String },
	wishes : [Wish], 
	date_created : { type : Date, default : Date.now}, 
	date_modified : { type : Date},
	created_by : { type : ObjectId, ref : 'User', required: true },
	category : { type : ObjectId, ref : 'Category', required: true },
    approval_status : {type : String, required : true, default : 'pending'},
	//approved : {type : Boolean, required : true, default : false},
}).index({
      'name':'text',
      'description':'text'
    });

// methods ======================

wishlistSchema.options.toJSON = {
    transform: function(doc, ret, options) {
    	var sanitized = {};

        sanitized.id = ret._id;
        sanitized.name = ret.name;
        sanitized.picture = ret.picture;
        sanitized.description = ret.description;
        sanitized.wishes = ret.wishes;
        sanitized.date_created = ret.date_created;
        sanitized.date_modified = ret.date_modified;
        sanitized.created_by = ret.created_by;
        sanitized.category = ret.category; 
        sanitized.approval_status = ret.approval_status;

        return sanitized;
    }
};

mongoose.model('Wishlist', wishlistSchema); 

//  pass model using module.exports
module.exports = mongoose.model('Wishlist'); 