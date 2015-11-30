// app/models/user.js
// INITILIAZE your model here
// var User =  new Model()

// module.exports = User;

// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	uuid = require('node-uuid'),
	Schema = mongoose.Schema;

//  set up a mongoose model and pass it using module.exports
var userSchema = new Schema({
	local : {
        full_name : { type : String},
	    email : { type : String, unique: true },
	    password : { type : String }
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    twitter : {
        id : String,
        token : String,
        display_name : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    role : { type : String, default: 'member' },
    profile : {
        dob : { type : Date, default : Date.now},
        gender : { type : String },
        picture : { type : String },
        address : { type : String },
        city : { type : String },
        state : { type : String },
        zipcode : { type : String },
    }

    /*
    username : { type : String, required : true },
    email : { type : String, required : true }
    */
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        var sanitized = {};

        sanitized.id = ret._id;
        sanitized.full_name = ret.local.full_name;
        sanitized.email = ret.local.email;
        sanitized.role = ret.role;
        sanitized.profile = ret.profile;

        return sanitized;
    }
};


mongoose.model('User', userSchema); 

//  pass model using module.exports
module.exports = mongoose.model('User'); 