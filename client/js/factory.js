var THE_GIVING_TREE_API_HOST = process.env.IP;


//var THE_GIVING_TREE_API_HOST = 'https://localhost:3000';
//var THE_GIVING_TREE_API_HOST = 'givingtrees.herokuapp.com:3000';
THE_GIVING_TREE_API_HOST = 'http://10.99.21.59:3000';

myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/products';
  var _prodFactory = {};

  _prodFactory.getProducts = function() {
    return $http.get(urlBase);
  }; 

  return _prodFactory;
});

myApp.factory('WishlistFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists';
  var _wishlistFactory = {};

  _wishlistFactory.createWishlist = function(name, description, created_by, category_id) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists';
    return $http.post(urlBase, {
      "name" : name,
      "description" : description,
      "created_by" : created_by,
      "category_id" : category_id
    });
  };

  _wishlistFactory.updateWishlist = function(id, name, description, category_id) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/' + id;
    return $http.put(urlBase, {
      "name" : name,
      "description" : description,
      "category_id" : category_id
    });
  };

  _wishlistFactory.getAllWishlists = function() {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    //urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/approved';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/admin/wishlists';
    
    return $http.get(urlBase);
  };

  _wishlistFactory.getApprovedWishlists = function() {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    //urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/approved';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/approved';
    
    return $http.get(urlBase);
  }; 

  _wishlistFactory.getApprovedWishlistsByCategory = function(categoryId) {
    
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/categories/' + categoryId + '/wishlists/approved';
    
    return $http.get(urlBase);
  }; 

  _wishlistFactory.getWishlistsByUser = function(userId) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/users/' + userId + '/wishlists';
    return $http.get(urlBase);
  }; 

  _wishlistFactory.getWishlist = function(wishlistId) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/' + wishlistId;
    return $http.get(urlBase);
  };

  _wishlistFactory.approveWishlist = function(wishlistId, status) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/admin/wishlists/' + wishlistId + '/approve/' +  status;
    return $http.put(urlBase);
  };

  _wishlistFactory.search = function(keywords) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/search/' + keywords;
    return $http.get(urlBase);
  };

  _wishlistFactory.createWish = function(wishlistId, name) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/' + wishlistId + '/wishes';
    return $http.post(urlBase, {
      "name" : name
    });
  };

  _wishlistFactory.updateWish = function(wishlistId, wishId, name) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/' + wishlistId + '/wishes/' + wishId;
    return $http.put(urlBase, {
      "name" : name
    });
  };

  _wishlistFactory.deleteWish = function(wishlistId, wishId) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists/' + wishlistId + '/wishes/' + wishId;
    return $http.delete(urlBase);
  };

  return _wishlistFactory;
});

myApp.factory('CategoryFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/categories';
  var _categoryFactory = {};

  _categoryFactory.getCategories = function() {
    return $http.get(urlBase);
  }; 

  return _categoryFactory;
});

myApp.factory('userFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  //var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/admin/users';
  var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/admin/users';
  var _userFactory = {};

  _userFactory.getUsers = function() {
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/admin/users';
    return $http.get(urlBase);
  }; 

  _userFactory.getUser = function(userId) {
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/users/' + userId + '/profile';
    return $http.get(urlBase);
  }; 

  _userFactory.editProfile = function(userId, full_name, gender, address, city, state, zipcode) {
    urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/users/' + userId + '/profile';
    return $http.put(urlBase, {
      "full_name" : full_name, 
      "gender" : gender,
      "address" : address, 
      "city" : city, 
      "state" : state, 
      "zipcode" : zipcode
    });
  }; 

  return _userFactory;
});

myApp.factory('AmazonFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = THE_GIVING_TREE_API_HOST + '/api/v1/wishlists';
  var _amazonFactory = {};

  _amazonFactory.search = function(keywords) {
    //urlBase = THE_GIVING_TREE_API_HOST + '/wishlists';
    urlBase = 'https://amazon-givingtree-api.herokuapp.com/search/All/' + keywords + '/1';
    //urlBase = 'https://www.google.com';
    
    return $http.get(urlBase);
  };

  return _amazonFactory;
});

