var User = require('../models/user');

var UserRepo = new (require('../repos/userRepo'))(User);

var users = {

  //======= CRUD OPERATIONS =============//

  create: function(req, res) {
    var newuser = req.body;
    data.push(newuser); // Spoof a DB call
    res.json(newuser);
  },

  getOne: function(req, res) {
    /*
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
    */

    var id = req.params.id || '';

    var query = {
      '_id' : id
    };

    UserRepo.getOne(query, function(err, user){
      
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
      
      if (!user) {
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "user not found"
          },
          "data": null
        }); 
      } else if (user) {
        res.status(200)
        .json({
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "user."
          },
          "data": user
        });
      }

       
    });
  },

  getAll: function(req, res) {
    var allusers = data; // Spoof a DB call
    
    //var query = { 'local.full_name' : { $regex : new RegExp('bOma DiKio', "i") }}; 
    var query = {}; 
    var query_options = { 
      limit : 0,
      skip : 0
    }

    UserRepo.getAll(query, query_options, function(err, results){
      
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
      
      var allusers = [];

      results.forEach(function(result){
        
        allusers.push({ 
          "id" : result._id,
          "fullName" : result.local.full_name,
          "email" : result.local.email,
          "role" : result.role,
          "profile" : result.profile
        });
      });

      res.status(200)
      .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "users."
          },
          "data": allusers || null
        }); 
    });
    
  },

  delete: function(req, res) {
    
    var id = req.params.id || '';

    var query = {
      //'local.full_name' : { $regex : new RegExp(req.body.full_name, "i") }
      '_id' : id
    },
    options = {
      
    };

    UserRepo.delete(query, options, function(err, user){
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

      if (!user) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "user not found"
          },
          "data": null
        }); 
      } else if (user) { 
        
        res.status(204)
        .json(
        {
          "meta": {
              "code": 204,
              "success" : true,
              "message" : "successfully deleted user."
          },
          "data": null
        }); 
      }
    });
  },

  //======= [END] CRUD OPERATIONS =============//


  rename: function(req, res) {
    /*
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
    */
    var id = req.params.id || '';
    var full_name = req.body.full_name || '';
    
    var query = {
      //'local.full_name' : { $regex : new RegExp(req.body.full_name, "i") }
      '_id' : id
    },
    update = {
      $set : { 'local.full_name' : full_name }
    },
    options = {
      new : true
    };

    UserRepo.update(query, update, options, function(err, user){
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

      if (!user) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "user not found"
          },
          "data": null
        }); 
      } else if (user) { 
        console.log(user);
        res.status(200)
        .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "successfully updated user."
          },
          "data": user
        }); 
      }
    });
  },

  updateUser: function(req, res) {
    /*
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
    */
    var id = req.params.id || '';
    var full_name = req.body.full_name || '';
    var gender = req.body.gender || '';
    var address = req.body.address || '';
    var city = req.body.city || '';
    var state = req.body.state || '';
    var zipcode = req.body.zipcode || '';

    //console.log()
    
    var query = {
      //'local.full_name' : { $regex : new RegExp(req.body.full_name, "i") }
      '_id' : id
    },
    update = {
      $set : { 
        'local.full_name' : full_name,
        'profile.gender' : gender,
        'profile.address' : address,
        'profile.city' : city,
        'profile.state' : state,
        'profile.zipcode' : zipcode,
      }
    },
    options = {
      //upsert : true,
      new : true
    };

    UserRepo.update(query, update, options, function(err, user){
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

      if (!user) {
        
        res.status(404)
        .json(
        {
          "meta": {
              "code": 404,
              "success" : false,
              "message" : "user not found"
          },
          "data": null
        }); 
      } else if (user) { 
        console.log(user);
        res.status(200)
        .json(
        {
          "meta": {
              "code": 200,
              "success" : true,
              "message" : "successfully updated user."
          },
          "data": user
        }); 
      }
    });
  },
};

var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];

module.exports = users;