var jwt = require('jwt-simple');
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


var wishlists = {

  //======= CRUD OPERATIONS =============//
 
  create: function(req, res) {

    var name = req.body.name || '';
    var description = req.body.description || '';
    var createdBy = req.body.created_by || '';
    var wishes = req.body.wishes || [];
    var category_id = req.body.category_id || [];
    var defaultCategory = 'uncategorized'; 

    
    async.waterfall(
      [
        function(callback){
          // If not a valid object id, then send null as
          // the callback
          if(mongoose.Types.ObjectId.isValid(category_id)){

            var query = {
              '_id': category_id
            };

            CategoriesRepo.getOne(query, function(err, category){
            
              if (err){
                res.json(err);
              } 

              if (!category) {
                callback(null, null);
              } else if (category) { 
                callback(null, category); 
              }
            });
          } else { 
            callback(null, null); 
          }
        },
        function(category, callback){
          // if the category is null, then use the default category
          if(!category){

            var query = {
              'name': defaultCategory
            };

            CategoriesRepo.getOne(query, function(err, category){
            
              if (err){
                res.json(err);
              } 

              if (!category) {
                callback(null, null);
              } else if (category) { 
                callback(null, category); 
              }
            });
          } else if (category) { 
            callback(null, category); 
          }
          
        },
        function(category, callback){

          var query = {
            'name' : name, 
            'description' : description, 
            'created_by' : createdBy, 
            'category' : category._id,
            'wishes' : wishes
          };

          WishlistRepo.create(query, function(err, wishlist){
            
            if (err){
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

            if (!wishlist) {
              res.status(400)
              .json(
              {
                "meta": {
                    "code": 400,
                    "success" : false,
                    "message" : "unable to create wishlist."
                },
                "data": null
              });
            } else if (wishlist) { 
               
              res.status(201)
              .json(
              {
                "meta": {
                    "code": 201,
                    "success" : true,
                    "message" : "successfully created wishlist."
                },
                "data": wishlist
              });
            }
          });
          
        }
      ],
      // the bonus final callback function
      function(err, status) {

      });
    
  },

  getOne: function(req, res) {

    var id = req.params.id || '';

    var query = {
      '_id' : id
    };

    WishlistRepo.getOne(query, function(err, wishlist){
      
      if (err){
        
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
      
      if (!wishlist) {
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "wishlist not found"
          },
          "data": null
        }); 
      } else if (wishlist) {
        res.status(200)
        .json({
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "wishlist."
          },
          "data": wishlist
        });
      }

       
    });

  },

  getAll: function(req, res) {

    var query = {

    },
    query_options = {
      limit : 0,
      skip : 0
    };

    WishlistRepo.getAll(query, query_options, function(err, wishlists){
      
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

  delete: function(req, res) {
    
    var id = req.params.id || '';

    var query = {
      '_id' : id
    },
    options = {
      
    };

    WishlistRepo.delete(query, options, function(err, wishlist){
      if (err){
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

      if (!wishlist) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "wishlist not found"
          },
          "data": null
        }); 
      } else if (wishlist) { 
        
        res.status(204)
        .json(
        {
          "meta": {
              "code": 204,
              "success" : true,
              "message" : "successfully deleted wishlist."
          },
          "data": null
        }); 
      }
    });
  },

   

  //======= [END] CRUD OPERATIONS =============//

  approve: function(req, res) {
    
    var id = req.params.id || '',
        status = req.params.status || '';

    var query = {
      '_id' : id
    },
    update = { 
      $set: { approval_status : status }
    },
    options = {
      new : true
    };

    WishlistRepo.update(query, update, options, function(err, wishlist){ 
      
      if (err){
        
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


      if (!wishlist) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "wishlist not found"
          },
          "data": null
        }); 
      } else if (wishlist) { 
          
        res.status(200)
        .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "successfully updated wishlist."
          },
          "data": wishlist.toJSON()
        }); 
      }
    });
    
  },

  getApproved: function(req, res) {

    var query = {
      //'approved' : true
      'approval_status' : 'approved'
    },
    query_options = {
      limit : 0,
      skip : 0
    };

    WishlistRepo.getAll(query, query_options, function(err, wishlists){
      
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
    });

  }, 

  createWish: function(req, res) {

    var id = req.params.id || '';
    var name = req.body.name || '';

    // If not a valid object id, then send null as
    // the callback
    if(mongoose.Types.ObjectId.isValid(id)){
      var query = {
          '_id': id
        },
        update = { 
          $push: { 
            wishes : {
              name : name 
            }
          }
        },
        options = {
          safe : true,
          new : true
        };

        WishlistRepo.update(query, update, options, function(err, wishlist){
          
          if (err){
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

          if (!wishlist) {
            res.status(400)
            .json(
            {
              "meta": {
                  "code": 400,
                  "success" : false,
                  "message" : "unable to create wish."
              },
              "data": null
            });
          } else if (wishlist) { 
             
            res.status(201)
            .json(
            {
              "meta": {
                  "code": 201,
                  "success" : true,
                  "message" : "successfully created wish."
              },
              "data": wishlist
            });
          }
        });
    } else {
      res.status(400)
      .json(
      {
        "meta": {
            "code": 400,
            "success" : false,
            "message" : "unable to create wish, because the wishlist does not exist."
        },
        "data": null
      });
    }
    
  },

  updateWish: function(req, res) {

    var wishlistId = req.params.wishlistId || '';
    var wishId = req.params.wishId || '';
    var name = req.body.name || '';

    
    // If not a valid object id, then send null as
    // the callback
    if(mongoose.Types.ObjectId.isValid(wishlistId) && mongoose.Types.ObjectId.isValid(wishId)){
      var query = {
          $and: [
            { '_id': wishlistId },
            { 
              'wishes._id': wishId
            }
          ]
          
        },
        update = { 
          '$set': {
            'wishes.$.name': name          
          }
        },
        options = {
          safe : true,
          new : true
        };

        WishlistRepo.update(query, update, options, function(err, wishlist){
          
          if (err){
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
          console.log(wishlist);
          if (!wishlist) {
            res.status(400)
            .json(
            {
              "meta": {
                  "code": 400,
                  "success" : false,
                  "message" : "unable to create wish."
              },
              "data": null
            });
          } else if (wishlist) { 
             
            res.status(201)
            .json(
            {
              "meta": {
                  "code": 201,
                  "success" : true,
                  "message" : "successfully created wish."
              },
              "data": wishlist
            });
          }
        });
    } else {
      res.status(400)
      .json(
      {
        "meta": {
            "code": 400,
            "success" : false,
            "message" : "unable to create wish, because the wishlist does not exist."
        },
        "data": null
      });
    }
  },

  deleteWish: function(req, res) {

    var wishlistId = req.params.wishlistId || '';
    var wishId = req.params.wishId || '';

    
    // If not a valid object id, then send null as
    // the callback
    if(mongoose.Types.ObjectId.isValid(wishlistId) && mongoose.Types.ObjectId.isValid(wishId)){
      var query = {
          $and: [
            { '_id': wishlistId },
            { 
              'wishes._id': wishId
            }
          ]
          
        },
        update = { 
          '$pull': {
            'wishes': {
              '_id' : wishId
            }          
          }
        },
        options = {
          safe : true,
          new : true
        };

        WishlistRepo.update(query, update, options, function(err, wishlist){
          
          if (err){
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
          
          if (!wishlist) {
            res.status(400)
            .json(
            {
              "meta": {
                  "code": 400,
                  "success" : false,
                  "message" : "unable to delete wish; the wish does not exist."
              },
              "data": null
            });
          } else if (wishlist) { 
             
            res.status(200)
            .json(
            {
              "meta": {
                  "code": 200,
                  "success" : true,
                  "message" : "successfully deleted wish."
              },
              "data": wishlist
            });
          }
        });
    } else {
      res.status(400)
      .json(
      {
        "meta": {
            "code": 400,
            "success" : false,
            "message" : "unable to create wish, because the wishlist does not exist."
        },
        "data": null
      });
    }
  },

  getWishlistsByUser: function(req, res) {
    var id = req.params.id || ''; 

    // TODO: validate input data

    var query = {
      'created_by' : id
    },
    query_options = {
      limit : 0,
      skip : 0
    };

    WishlistRepo.getAll(query, query_options, function(err, wishlists){
      
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
    });

  },

  getWishlistsByCategory: function(req, res) {
    var id = req.params.id || ''; 

    // TODO: validate input data

    if(mongoose.Types.ObjectId.isValid(id)){
      var query = {
        'category' : id,
        'approval_status' : 'approved'
      },
      query_options = {
        limit : 0,
        skip : 0
      };

      WishlistRepo.getAll(query, query_options, function(err, wishlists){
        
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
      });
    } else {
      res.status(200)
        .json(
          {
            "meta": {
                "code": 200,
                "success" : true,
                "message" : "wishlists."
            },
            "data": []
          }); 
    }

  },

  update: function(req, res) {
    
    var id = req.params.id || '';
    var name = req.body.name || '';
    var description = req.body.description || '';
    var category_id = req.body.category_id || '';

    // TODO: validate input, expecially category_id

    var query = {
      '_id' : id
    },
    update = { 
      $set: { 
        name : name,
        description : description,
        category : category_id 
      }
    },
    options = {
      new : true
    };

    WishlistRepo.update(query, update, options, function(err, wishlist){ 
      
      if (err){
        
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


      if (!wishlist) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "wishlist not found"
          },
          "data": null
        }); 
      } else if (wishlist) { 
          
        res.status(200)
        .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "successfully updated wishlist."
          },
          "data": wishlist.toJSON()
        }); 
      }
    });
    
  },

  getCategories: function(req, res) {
    WishlistRepo.getCategories(function(err, categories){
      
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
              "message" : "categories."
          },
          "data": categories || null
        }); 
    });
  },
}

// private method


module.exports = wishlists;

//  Private method
//function SanitizedUser
/* DATA FORMAT */
/*
{
  "meta": {
    "code": 401,
    "success" : false,
    "message" : "Invalid credentials"
  },
  "data": null,
  "pagination": {
    "next_url": "",
    "next_max_id": ""
  }
}

{
  "meta": {
    "error_type": "OAuthException",
    "code": 400,
    "error_message": "..."
  }
}


*/