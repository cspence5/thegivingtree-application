'use strict'

function wishlistRepo(wishlistModel, wishModel){
	this.wishlistCollection = wishlistModel;
	this.wishCollection = wishModel;
}

//======= CRUD OPERATIONS =============//

wishlistRepo.prototype.create = function(query, callback){

	// TODO: Validate query data

	var newWishlist = new this.wishlistCollection();
	
	newWishlist.name = query.name;
	newWishlist.description = query.description;
	newWishlist.created_by = query.created_by;
	newWishlist.wishes = query.wishes; 
	newWishlist.category = query.category;
	/*wishes.forEach(function(wish){
		console.log(wish);
		newWishlist.wishes.push(wish);
	});
	*/

	newWishlist.save(function(err, result) {
		if (err){
			return callback(err);
		}
		
		if (result) {
			result.populate('category', function(err){
				if (err){
					return callback(err);
				}

				callback(null, result);
			});
		} else if (!result) {
		  	callback(null, null);
		}
	});
};

wishlistRepo.prototype.getOne = function(query, callback){
	this.wishlistCollection.findOne(query)
	.populate('category created_by')
	.exec(function(err, wishlist) {

		if (err){
			return callback(err);
		} 

		if (wishlist) {
		  	callback(null, wishlist);
		} else if (!wishlist) {
		  	callback(null, null);
		} 
	}); 
};

wishlistRepo.prototype.getAll = function(query, query_options, callback){
	
	this.wishlistCollection.find(query)
	.limit(query_options.limit)
	.skip(query_options.skip)
	.populate('category created_by')
	.exec(function(err, wishlists) {

		if (err){
			return callback(err);
		} 

		if (wishlists) {
		  	callback(null, wishlists);
		} else if (!wishlists) {
		  	callback(null, null);
		}
	});
};

wishlistRepo.prototype.update = function(query, update, options, callback){
	
	this.wishlistCollection.findOneAndUpdate(query, update, options, function (err, result) {
        
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

wishlistRepo.prototype.delete = function(query, options, callback){
	
	this.wishlistCollection.findOneAndRemove(query, options, function (err, result) {
        
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

wishlistRepo.prototype.search = function(query, queryScore, querySort, query_options, callback){
	
	this.wishlistCollection
	.find(query, queryScore)
	.limit(query_options.limit)
	.skip(query_options.skip)
	.sort(querySort)
	.populate('category created_by')
	.exec(function (err, result) {
        
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

wishlistRepo.prototype.createWish = function(wishlist, query, callback){

	// TODO: Validate query data

	var newWish = new this.wishCollection();
	
	newWish.name = query.name;
	/*wishes.forEach(function(wish){
		console.log(wish);
		newWishlist.wishes.push(wish);
	});
	*/

	wishlist.save(function(err, result) {
		if (err){
			return callback(err);
		}
		
		if (result) {
			result.populate('category', function(err){
				if (err){
					return callback(err);
				}

				callback(null, result);
			});
		} else if (!result) {
		  	callback(null, null);
		}
	});
};

wishlistRepo.prototype.getWishlistById = function(id, callback){
	this.wishlistCollection.findOne({
		'_id': id
	},
	function(err, wishlist) {

		if (err){
			return callback(err);
		} 

		if (wishlist) {
		  	callback(null, wishlist);
		} else if (!wishlist) {
		  	callback(null, null);
		} 
	}); 
};
 
wishlistRepo.prototype.approveWishlist = function(id, callback){
	
	this.wishlistCollection.findByIdAndUpdate(id, {$set: {approved: false}}, { new: true }, function (err, result) {
        
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

wishlistRepo.prototype.getWishlists = function(callback){
	
	this.wishlistCollection.find({}).populate('category').exec(function(err, wishlists) {

		if (err){
			return callback(err);
		} 

		if (wishlists) {
		  	callback(null, wishlists);
		} else if (!wishlists) {
		  	callback(null, null);
		}
	});
};

wishlistRepo.prototype.getApprovedWishlists = function(callback){
	this.wishlistCollection.find({
		'approved' : true
	},
	function(err, wishlists) {

		if (err){
			return callback(err);
		} 

		if (wishlists) {
		  	callback(null, wishlists);
		} else if (!wishlists) {
		  	callback(null, null);
		}
	});
};

wishlistRepo.prototype.getCategories = function(callback){
	this.wishlistCollection.distinct('category', function(err, categories) {

		if (err){
			return callback(err);
		} 

		if (categories) {
		  	callback(null, categories);
		} else if (!categories) {
		  	callback(null, null);
		}
	});

	/*
	this.wishlistCollection.find({
		
	},
	{category : 1, _id : 0},
	function(err, categories) {

		if (err){
			return callback(err);
		} 

		if (categories) {
		  	callback(null, categories);
		} else if (!categories) {
		  	callback(null, null);
		}
	});
	*/
};


module.exports = wishlistRepo;