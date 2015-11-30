var jwt = require('jwt-simple');
var _ = require('underscore');

// Init Models
var Wishlist = require('../models/wishlist');
var Wish = require('../models/wish');
var Category = require('../models/category');

// Init Repos
var CategoriesRepo = new (require('../repos/categoriesRepo'))(Category);

var categories = {
	
  //======= CRUD OPERATIONS =============//

  create: function(req, res) {

    var name = req.body.name || '';

    // TODO: Validate input data

    var query = {
      'name' : name
    }; 

    CategoriesRepo.create(query, function(err, category){
      
      if (err){
        res.json(err);
      } 

      if (!category) {
        res.json(null);
      } else if (category) { 
        res.status(201)
        .json({
          "meta": {
              "code": 201,
              "success" : true,
              "message" : "Successfully created category."
          },
          "data": { 
        	"id" : category._id,
        	"name" : category.name
    		}
        });  
      }
    });
    
  },

  getOne: function(req, res) {

    var id = req.params.id || '';

    var query = {
      '_id' : id
    };

    CategoriesRepo.getOne(query, function(err, category){
      
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
      
      if (!category) {
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "category not found"
          },
          "data": null
        }); 
      } else if (category) {
        res.status(200)
        .json({
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "category."
          },
          "data": category
        });
      }

       
    });

  },

  getAll: function(req, res) {

    var query = {}; 
    var query_options = { 
      limit : 0,
      skip : 0
    }

    CategoriesRepo.getAll(query, query_options, function(err, categories){
      
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

  delete: function(req, res) {
    
    var id = req.params.id || '';

    var query = {
      '_id' : id
    },
    options = {
      
    };

    CategoriesRepo.delete(query, options, function(err, category){
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

      if (!category) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "category not found"
          },
          "data": null
        }); 
      } else if (category) { 
        
        res.status(204)
        .json(
        {
          "meta": {
              "code": 204,
              "success" : true,
              "message" : "successfully deleted category."
          },
          "data": null
        }); 
      }
    });
  },

  //======= [END] CRUD OPERATIONS =============//

  rename: function(req, res) {
    
    var id = req.params.id || '';
    var name = req.body.name || '';

    var query = {
      '_id' : id
    },
    update = { 
      $set: { name : name }
    },
    options = {
      new : true
    };

    CategoriesRepo.update(query, update, options, function(err, category){ 
      
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


      if (!category) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "category not found"
          },
          "data": null
        }); 
      } else if (category) { 
          
        res.status(200)
        .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "successfully updated category."
          },
          "data": category//.toJSON()
        }); 
      }
    });
    
  },
}

// private method


module.exports = categories;

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