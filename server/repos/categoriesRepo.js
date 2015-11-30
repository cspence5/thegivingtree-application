'use strict'

function categoriesRepo(categoriesModel){
	this.categoriesCollection = categoriesModel;
}
 
//======= CRUD OPERATIONS =============//

categoriesRepo.prototype.create = function(query, callback){
	
	var newCategory = new this.categoriesCollection();
	
	newCategory.name = query.name;

	newCategory.save(function(err, result) {
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

categoriesRepo.prototype.getOne = function(query, callback){
	
	this.categoriesCollection.findOne(query, function(err, category) {
		
		if (err){
			return callback(err);
		} 

		if (category) {
		  	callback(null, category);
		} else if (!category) {
		  	callback(null, null);
		}
	});
};

categoriesRepo.prototype.getAll = function(query, query_options, callback){
	
	this.categoriesCollection.find(query, function(err, categories) {
		
		if (err){
			return callback(err);
		} 

		if (categories) {
		  	callback(null, categories);
		} else if (!categories) {
		  	callback(null, null);
		}
	})
	.limit(query_options.limit)
	.skip(query_options.skip);
};

categoriesRepo.prototype.update = function(query, update, options, callback){
	
	this.categoriesCollection.findOneAndUpdate(query, update, options, function (err, result) {
        
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

categoriesRepo.prototype.delete = function(query, options, callback){
	
	this.categoriesCollection.findOneAndRemove(query, options, function (err, result) {
        
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

/*
categoriesRepo.prototype.create = function(name, callback){
	var newCategory = new this.categoriesCollection();
	
	newCategory.name = name;

	newCategory.save(function(err, result) {
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

categoriesRepo.prototype.get = function(query, callback){
	this.categoriesCollection.findOne(query, function(err, category) {

		if (err){
			return callback(err);
		} 

		if (category) {
			console.log('who is in here right now');  
		  	callback(null, category);
		} else if (!category) {
		  	callback(null, null);
		}
	});
};


categoriesRepo.prototype.getAll = function(callback){
	this.categoriesCollection.find({

	}, { '__v' : 0 },
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
};

categoriesRepo.prototype.getById = function(categoryId, callback){
	this.categoriesCollection.findOne({ '_id' : categoryId }, function(err, category) {

		if (err){
			return callback(err);
		} 

		if (category) {
			console.log('who is in here right now');  
		  	callback(null, category);
		} else if (!category) {
		  	callback(null, null);
		}
	});
};

categoriesRepo.prototype.getByName = function(categoryName, callback){
	this.categoriesCollection.findOne({ 'name' : categoryName }, function(err, category) {

		if (err){
			return callback(err);
		} 

		if (category) {
		  	callback(null, category);
		} else if (!category) {
		  	callback(null, null);
		}
	});
};
*/

module.exports = categoriesRepo;