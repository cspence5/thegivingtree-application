var jwt = require('jwt-simple');
var _ = require('underscore');

// Init Models
var User = require('../models/user');

// Init Repos
var UserRepo = new (require('../repos/userRepo'))(User);

var auth = {

  login: function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      res.status(401);
      res.json(
      {
        "meta": {
            "code": 401,
            "success" : false,
            "message" : "Invalid credentials"
        },
        "data": null
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.validate(email, password, function(err, user){

      if (!user) { // If authentication fails, we send a 401 back
        res.status(401);
        res.json(
        {
          "meta": {
              "code": 401,
              "success" : false,
              "message" : "Invalid credentials"
          },
          "data": null
        });
        return;
      }

      if (user) {

        // If authentication is success, we will generate a token
        // and dispatch it to the client

        res
        .status(200)
        .json(genToken(user));
      }
    });
  },

  register: function(req, res) {
    var full_name = req.body.full_name || '';
    var email = req.body.email || '';
    var password = req.body.password || '';
    var dob = req.body.dob || '';
    var gender = req.body.gender || '';
    var role = req.body.role || '';

    // TODO: validate input data

    if (email == '' || password == '') {
      res.status(422);
      res.json(
      {
        "meta": {
            "code": 422,
            "success" : false,
            "message" : "Missing email / password."
        },
        "data": null
      });
      return;
    }

    var query = {
      'local.email' : { $regex : new RegExp(email, "i") }
    };

    UserRepo.getOne(query, function(err, user){
      if (err){
        //throw err;
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

      if (user) {
        res.status(409)
        .json(
          {
            "meta": {
                "code": 409,
                "success" : false,
                "message" : "User already exists."
            },
            "data": null
          });
      } else if (!user) {

        var new_user_query = {
          full_name : full_name,
          email : email,
          password : password,
          dob : dob,
          gender : gender,
          role : role
        };

        UserRepo.create(new_user_query, function(err, newUser){
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

          res.status(201)
          .json(
          {
            "meta": {
                "code": 201,
                "success" : true,
                "message" : "User saved successfully."
            },
            "data": newUser
          });
        });
        return; 
      }
    });
  },

  validate: function(email, password, callback) {
    /*
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      email: 'arvind@myapp.com'
    };
    
    if(email.toLowerCase() !== dbUserObj.email.toLowerCase()){
      dbUserObj = null; 
    }

    return dbUserObj;
    */
    
    var query = {
      'local.email' : { $regex : new RegExp(email, "i") }
    };

    UserRepo.getOne(query, function(err, user){
      if (err){
        //throw err;
        callback(err);
      } 

      if (!user) {
        //return null;
        callback(null, null);
      } else if (user) {
       
        if (!user.validPassword(password)){
          //return null;
          callback(null, null);
        } else {
          //return user;
          callback(null, user);
        }  
      }
    });
    
  },

  validateUser: function(email, callback) {
    /*
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      email: 'arvind@myapp.com'
    };

    if(email !== dbUserObj.email){
      dbUserObj = null;
    }

    return dbUserObj;
    */

    var query = {
      'local.email' : { $regex : new RegExp(email, "i") }
    };

    UserRepo.getOne(query, function(err, user){
      if (err){
        callback(err);
      } 

      if (!user) {
        callback(null, null);
      } else if (user) {

        user = user.toObject();
        delete user.local.password;

        //console.log('show user');
        //console.log(user);
        callback(null, user);
        /*
        if (!user.validPassword(password)){
          //return null;
          callback(null, null);
        } else {
          //return user;
          console.log(user);
          callback(null, user);
        }  
        */
      }
    });
  },
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  user = {
    "id" : user._id,
    "email" : user.local.email,
    "role" : user.role
  }

  return {
    "meta" : {
      "code" : 200,
      "success" : true,
      "token" : token,
      "expires" : expires
    },
    "data" : user
  }
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;

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