'use strict'

function userRepo(userModel){
	this.userCollection = userModel;
}

//======= CRUD OPERATIONS =============//

userRepo.prototype.create = function(query, callback){
	var newUser = new this.userCollection();

    // set the user's local credentials
    newUser.local.full_name = query.full_name;
    newUser.local.email = query.email;
    newUser.local.password = newUser.generateHash(query.password);
    newUser.profile.dob = new Date(query.dob);
    newUser.profile.gender = query.gender;
    if(query.role){
		newUser.role = query.role;
    }

    newUser.save(function(err, result) {
		if (err){
			return callback(err);
		} 

      	if (result) {
			callback(null, result);
		} else if (!user) {
			callback(null, null);
		}
    }); 
};

userRepo.prototype.getOne = function(query, callback){
	
	this.userCollection.findOne(query, function(err, user) {
		
		if (err){
			return callback(err);
		} 

		if (user) {
		  	callback(null, user);
		} else if (!user) {
		  	callback(null, null);
		}
	});
};

userRepo.prototype.getAll = function(query, query_options, callback){
	
	this.userCollection.find(query, function(err, users) {
		
		if (err){
			return callback(err);
		} 

		if (users) {
		  	callback(null, users);
		} else if (!users) {
		  	callback(null, null);
		}
	})
	.limit(query_options.limit)
	.skip(query_options.skip);
};

userRepo.prototype.update = function(query, update, options, callback){
	
	this.userCollection.findOneAndUpdate(query, update, options, function (err, result) {
        
        if (err){
			return callback(err);
		}
		
		if (result) {
		  	callback(null, result);
		} else if (!result) {
		  	callback(null, null);
		}
		
    });
};

userRepo.prototype.delete = function(query, options, callback){
	
	this.userCollection.findOneAndRemove(query, options, function (err, result) {
        
        if (err){
			return callback(err);
		}
		
		if (result) {
		  	callback(null, result);
		} else if (!result) {
		  	callback(null, null);
		}
		
    });
};

//======= [END] CRUD OPERATIONS =============//

userRepo.prototype.getUserById = function(email, callback){
	this.userCollection.findOne({
		'local.email': email
	},
	function(err, user) {

		if (err){
			return callback(err);
		} 

		if (user) {
		  	callback(null, user);
		} else if (!user) {
		  	callback(null, null);
		}
	});
};

userRepo.prototype.getUserByEmail = function(email, callback){
	this.collection.findOne({
		'local.email': email
	},
	function(err, user) {
		
		if (err){
			return callback(err);
		} 

		if (user) {
		  	callback(null, user);
		} else if (!user) {
		  	callback(null, null);
		}
	});
};



module.exports = userRepo;