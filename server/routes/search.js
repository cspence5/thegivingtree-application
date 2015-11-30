var _ = require('underscore');
var async = require('async');
var mongoose = require('mongoose');


// Init Models
var Wishlist = require('../models/wishlist');
var Wish = require('../models/wish');
var Category = require('../models/category');

// Init Repos
var WishlistRepo = new (require('../repos/wishlistRepo'))(Wishlist, Wish);
var CategoriesRepo = new (require('../repos/categoriesRepo'))(Category);


var search = {
	getAll: function(req, res) {

		var keywords = req.params.keywords || '';

		var sort
	        , find
	        , findScore;

	    find = {
	    	//'$text':{'$search':keywords},
	    	'$text':{'$search':keywords},
	    	'approval_status' : 'approved'
	    };
		findScore = {'score':{'$meta':'textScore'}};
		sort = {'score': {'$meta':'textScore'} };

	    var query = {

	    },
	    query_options = {
	      limit : 0,
	      skip : 0
	    };

	    WishlistRepo.search(find, findScore, sort, query_options, function(err, wishlists){
	      
	      if (err){
	        //res.json(err);
	        console.log(err);

	        res.status(500)
	        .json(
	        {
	          "meta": {
	              "code": 500,
	              "success" : false,
	              "message" : "Server error."
	          },
	          "data": null
	        });
	      } 
	      
	      res.status(200)
	      .json(
	        {
	          "meta": {
	              "code": 200,
	              "success" : true,
	              "message" : "wishlists."
	          },
	          "data": wishlists || null
	        }); 
	      /*
	      if (!wishlists) {
	        res.json(null);
	      } else if (wishlists) { 
	        
	      }
	      */
	    });

  	},
}

module.exports = search;