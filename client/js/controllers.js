myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);

myApp.controller("HomeCtrl", ['$scope', '$routeParams', '$location', 'WishlistFactory', 'CategoryFactory',
  function($scope, $routeParams, $location, WishlistFactory, CategoryFactory) {
    $scope.name = "Home Controller";

    $scope.vm = {};
    $scope.wishlists = [];
    $scope.categories = [];

    var keywords = $scope.vm.keywords || '';
    var category = $routeParams.category || '';
    
    // Get Categories
    CategoryFactory.getCategories().then(function(data) {
      
      $scope.categories = data.data.data;
    });

    // Is it a search request?
    if(!$routeParams.keywords){

      // Is it a search by category?
      if(!category){
        
        // Access the factory and get the latest wishlists
        WishlistFactory.getApprovedWishlists().then(function(data) {

          $scope.wishlists = data.data.data;
          
          $scope.filter = [];
        
          $scope.wishlistFilter = function (ids) {
                return function (item) {
                  var filter = $scope.filter;

                     return filter.indexOf(item.id) !== -1;         
                  }
           }

           
          //Example from
          // http://jsfiddle.net/RajamohanShilpa/tue3jhy1/
        }); 
      } else{
        
        // Access the factory and get the latest wishlists by category
        WishlistFactory.getApprovedWishlistsByCategory(category).then(function(data) {

          $scope.wishlists = data.data.data;
          
          $scope.filter = [];
        
          $scope.wishlistFilter = function (ids) {
                return function (item) {
                  var filter = $scope.filter;

                     return filter.indexOf(item.id) !== -1;         
                  }
           }

          //Example from
          // http://jsfiddle.net/RajamohanShilpa/tue3jhy1/
        }); 
      }
     
    } else{

      keywords = $routeParams.keywords || '';

      // Access the factory and get the latest wishlists by keywords
      WishlistFactory.search(keywords).then(function(data) {

        $scope.wishlists = data.data.data;
        
        $scope.filter = [];
      
        $scope.wishlistFilter = function (ids) {
              return function (item) {
                var filter = $scope.filter;

                   return filter.indexOf(item.id) !== -1;         
                }
         }

        //Example from
        // http://jsfiddle.net/RajamohanShilpa/tue3jhy1/
      });
    }

    

    

    $scope.search = function(isValid){
      keywords = $scope.vm.keywords || '';
      
      if(!isValid){
        $scope.searchForm.submitted = true;
      } else {
        $location.path("/search/" + keywords);
      }
    }
  }
]);

myApp.controller("Page1Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page1 Controller";
  }
]);

myApp.controller("Page2Ctrl", ['$scope',
  function($scope) {
    $scope.name = "Page2 Controller";
    // below data will be used by checkmark filter to show a ✓ or ✘ next to it
    $scope.list = ['yes', 'no', true, false, 1, 0];
  }
]);

myApp.controller("Page3Ctrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.products = [];

    // Access the factory and get the latest products list
    dataFactory.getProducts().then(function(data) {
      $scope.products = data.data;
    });

  }
]);

myApp.controller("Page4Ctrl", ['$scope', 'userFactory',
  function($scope, userFactory) {
    $scope.users = [];

    // Access the factory and get the latest users list
    userFactory.getUsers().then(function(data) {
      $scope.users = data.data.data;
      //console.log(data.data.data);
    });

  }
]);

myApp.controller("DashboardCtrl", ['$scope', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {
    $scope.wishlists = [];

    var user = JSON.parse(AuthenticationFactory.user);
    
    // Access the factory and get the latest users list
    WishlistFactory.getWishlistsByUser(user.id).then(function(data) {
      $scope.wishlists = data.data.data;
      
      $scope.filter = [];
    
      $scope.wishlistFilter = function (ids) {
            return function (item) {
              var filter = $scope.filter;

                 return filter.indexOf(item.id) !== -1;         
              }
       }
       $scope.quantity = 4;
    });

  }
]);

myApp.controller("WishlistsCtrl", ['$scope', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {

    // TODO: work on filters

    $scope.wishlists = [];

    var user = JSON.parse(AuthenticationFactory.user);
    
    // Access the factory and get the latest users list
    WishlistFactory.getWishlistsByUser(user.id).then(function(data) {
      $scope.wishlists = data.data.data;
      
      $scope.filter = [];
      $scope.wishlists.forEach(function(val){
        //console.log(val.approved);
        $scope.filter.push(val.approval_status);
      });
    
      $scope.wishlistFilter = function (ids) {
        
            return function (item) {
              var filter = $scope.filter;
              
                 //return filter.indexOf(item.id) !== -1;     
                 return filter.indexOf(item.approval_status);     
              }
       }
       //$scope.quantity = 4;
    });

    $scope.loadNewFilter = function (filter){
        console.log(filter);
        $scope.filter = filter;
        //$scope.filter = [1,5];
        //$scope.filter = [sf];
        //$scope.$apply();
    }

  }
]);

myApp.controller("WishlistCtrl", ['$scope', '$routeParams', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, $routeParams, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {
    //console.log($routeParams.id);
    // TODO: work on filters
    // http://stackoverflow.com/questions/20227377/angularjs-dynamic-pages-same-template-how-to-access-and-load-article-by-id
    // http://plnkr.co/edit/7pYWjCqBufRkxKEk23ev?p=preview
    
    $scope.vm = {};
    $scope.wishlists = [];

    var user = JSON.parse(AuthenticationFactory.user);
    var wishlistId = $routeParams.id;

    //TODO: Validate input data
    
    // Access the factory and get the latest users list
    WishlistFactory.getWishlist(wishlistId).then(function(data) {
      $scope.wishlist = data.data.data;

      $scope.vm.wishlist = $scope.wishlist;
      $scope.vm.wishes = $scope.wishlist.wishes;

      $scope.filter = [];
    
      $scope.wishFilter = function (ids) {
            return function (item) {
              var filter = $scope.filter;

                 return filter.indexOf(item.id) !== -1;         
              }
       }
       $scope.quantity = null;

    });

  }
]);

myApp.controller("ProfileCtrl", ['$scope', '$routeParams', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, $routeParams, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {
    //console.log($routeParams.id);
    // TODO: work on filters
    // http://stackoverflow.com/questions/20227377/angularjs-dynamic-pages-same-template-how-to-access-and-load-article-by-id
    // http://plnkr.co/edit/7pYWjCqBufRkxKEk23ev?p=preview
    
    $scope.vm = {};
    $scope.wishlists = [];


    var user = JSON.parse(AuthenticationFactory.user);
    var wishlistId = $routeParams.id;

    //TODO: Validate input data
    
    userFactory.getUser(user.id).then(function(data) {
      $scope.vm.user = data.data.data;
      console.log(data.data.data);
      console.log($scope.vm.user.full_name);
    });
    
    $scope.editProfile = function(isValid) {

      if(!isValid){
        $scope.profileForm.submitted = true;
      } else {
        
        var full_name = $scope.vm.user.full_name || '',
          gender = $scope.vm.user.profile.gender,
          address = $scope.vm.user.profile.address || '',
          city = $scope.vm.user.profile.city || '',
          state = $scope.vm.user.profile.state || '',
          zipcode = $scope.vm.user.profile.zipcode || '';

          console.log(full_name + ' : ' + address + ' : ' + city + ' : ' + state + ' : ' + zipcode);


        if (full_name !== undefined && address !== undefined && city !== undefined && state !== undefined && zipcode !== undefined) {
          userFactory.editProfile(user.id, full_name, gender, address, city, state, zipcode).then(function(data) {
            $scope.vm.user = data.data.data;
            console.log(data.data.data);
            console.log($scope.vm.user.full_name);
          });
        }
      }
    }
  }
]);

myApp.controller("CreateWishlistCtrl", ['$scope', '$routeParams', '$location', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, $routeParams, $location, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {
    //console.log($routeParams.id);
    // TODO: work on filters
    // http://stackoverflow.com/questions/20227377/angularjs-dynamic-pages-same-template-how-to-access-and-load-article-by-id
    // http://plnkr.co/edit/7pYWjCqBufRkxKEk23ev?p=preview
    
    $scope.vm = {};
    $scope.wishlists = [];
    $scope.vm.categories = [];

    var user = JSON.parse(AuthenticationFactory.user);
    var wishlistId = $routeParams.id;

    //TODO: Validate input data
    
    // Access the factory and get the latest users list

    

    if(wishlistId){
      

      WishlistFactory.getWishlist(wishlistId).then(function(data) {
        $scope.wishlist = data.data.data;

        $scope.vm.wishlist = $scope.wishlist;
        $scope.vm.wishes = $scope.wishlist.wishes;

        $scope.filter = [];
      
        $scope.wishFilter = function (ids) {
              return function (item) {
                var filter = $scope.filter;

                   return filter.indexOf(item.id) !== -1;         
                }
        }
        $scope.quantity = null;

        // Get Categories
        CategoryFactory.getCategories().then(function(data) {
          
          $scope.vm.categories = data.data.data;
          
          $scope.vm.categories.forEach(function(category, index){
            
            if(category.name === $scope.wishlist.category.name){
              $scope.vm.category = $scope.vm.categories[index];
            }
          });
        });

      });
    } else {
      // Get Categories
      CategoryFactory.getCategories().then(function(data) {
        
        $scope.vm.categories = data.data.data;
        
        $scope.vm.categories.forEach(function(category, index){
          if(category.name === 'uncategorized'){
            $scope.vm.category = $scope.vm.categories[index];
            //return false;
            //return $scope.vm.categories[index];
          }
        });
      });
    }

    $scope.createWishlist = function(isValid) {

      if(!isValid){
        $scope.createWishlistForm.submitted = true;
      } else {
        
        var name = $scope.wishlist.name || '',
          description = $scope.wishlist.description || '',
          category = $scope.vm.category.id || '';


        if (name !== undefined && description !== undefined) {
          
          if(!wishlistId){
            WishlistFactory.createWishlist(name, description, user.id, category).success(function(data) {
            
              $scope.wishlist = data.data;

              $location.path("/wishlists/" + $scope.wishlist.id + "/create_wish");

            }).error(function(status) {
              alert('Oops something went wrong!');
            });
          } else {
            
            WishlistFactory.updateWishlist(wishlistId, name, description, category).success(function(data) {
            
              $scope.wishlist = data.data;

              $location.path("/wishlists/" + $scope.wishlist.id + "/create_wish");

            }).error(function(status) {
              alert('Oops something went wrong!');
            });
          }
          
        } else {
          alert('Invalid credentials');
        }
      }

    };

  }
]);

myApp.controller("CreateWishCtrl", ['$scope', '$route', '$routeParams', '$location', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory', 'AmazonFactory',
  function($scope, $route, $routeParams, $location, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory, AmazonFactory) {
    //console.log($routeParams.id);
    // TODO: work on filters
    // http://stackoverflow.com/questions/20227377/angularjs-dynamic-pages-same-template-how-to-access-and-load-article-by-id
    // http://plnkr.co/edit/7pYWjCqBufRkxKEk23ev?p=preview
    
    $scope.vm = {};
    /*
    $scope.vm.wishlist = {};
    $scope.vm.wishes = {};
    $scope.vm.wish = {};
    */


    var user = JSON.parse(AuthenticationFactory.user);
    var wishlistId = $routeParams.id;

    $scope.vm.wishlistId = wishlistId;
    //TODO: Validate input data
    
    // Access the factory and get the latest users list
    loadWishes();
    /*
    WishlistFactory.getWishlist(wishlistId).then(function(data) {
      $scope.wishlist = data.data.data;

      $scope.vm.wishlist = $scope.wishlist;
      $scope.vm.wishes = $scope.wishlist.wishes;
      $scope.vm.wish = $scope.vm.wish || {};

      $scope.filter = [];
    
      $scope.wishFilter = function (ids) {
            return function (item) {
              var filter = $scope.filter;

                 return filter.indexOf(item.id) !== -1;         
              }
      }
      $scope.quantity = null;
    });
    */

    $scope.selectItem = function(item) {
        //$rootScope.item = item;
        //$scope.item = item;
        $scope.vm.wish = item;
        //console.log($scope.vm.wish);
    }

    $scope.search = function() {
        
      var keywords = $scope.vm.keywords || '';
      
      if (keywords !== undefined) {
          
        AmazonFactory.search(keywords).success(function(data) {
          
          //$('#add').modal('hide');
          // TODO : Clear modal data
          //$('#add').removeData("bs.modal").find(".modal-content").empty();
          //$('#add').removeData('modal');
          //loadWishes();
          console.log(data);
          
          //$location.path("/wishlists/" + $scope.vm.wishlist.id + "/create_wish");
        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      }
    }

    $scope.createWish = function(isValid) {
      
      if(!isValid){
        $scope.createWishForm.submitted = true;
      } else {
        
        var name = $scope.vm.wish.name || '',
          description = $scope.wishlist.description || '';


        if (name !== undefined && description !== undefined) {
          
          WishlistFactory.createWish(wishlistId, name).success(function(data) {
            
            $('#add').modal('hide');
            // TODO : Clear modal data
            //$('#add').removeData("bs.modal").find(".modal-content").empty();
            //$('#add').removeData('modal');
            loadWishes();
            
            //$location.path("/wishlists/" + $scope.vm.wishlist.id + "/create_wish");
          }).error(function(status) {
            alert('Oops something went wrong!');
          });
        }
      }
    };

    $scope.updateWish = function(isValid) {
      
      if(!isValid){
        $scope.createWishForm.submitted = true;
      } else {
        
        var wishId = $scope.vm.wish.id || '',
          name = $scope.vm.wish.name || '',
          description = $scope.wishlist.description || '';


        if (name !== undefined && description !== undefined) {
          
          WishlistFactory.updateWish(wishlistId, wishId, name).success(function(data) {
            //$scope.vm.wish = null;
            $('#edit').modal('hide');
            // TODO : Clear modal data
            //$('#add').removeData("bs.modal").find(".modal-content").empty();
            //$('#add').removeData('modal');
            loadWishes();
            
            //$location.path("/wishlists/" + $scope.vm.wishlist.id + "/create_wish");
          }).error(function(status) {
            alert('Oops something went wrong!');
          });
        }
      }

      
    };

    $scope.deleteWish = function() {
      
      var wishId = $scope.vm.wish.id || '';


      if (wishId !== undefined) {
        
        WishlistFactory.deleteWish(wishlistId, wishId).success(function(data) {
          //$scope.vm.wish = null;
          $('#delete').modal('hide');
          // TODO : Clear modal data
          //$('#add').removeData("bs.modal").find(".modal-content").empty();
          //$('#add').removeData('modal');
          loadWishes();
          
          //$location.path("/wishlists/" + $scope.vm.wishlist.id + "/create_wish");
        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      }

      
    };

    $scope.back = function() {
      $location.path("/wishlists/update/" + $scope.vm.wishlistId);
    };

    function loadWishes(){
      WishlistFactory.getWishlist(wishlistId).then(function(data) {
        $scope.wishlist = data.data.data;

        $scope.vm.wishlist = $scope.wishlist;
        $scope.vm.wishes = $scope.wishlist.wishes;
        $scope.vm.wish = $scope.vm.wish || {};

        $scope.filter = [];
      
        $scope.wishFilter = function (ids) {
              return function (item) {
                var filter = $scope.filter;

                   return filter.indexOf(item.id) !== -1;         
                }
        }
        $scope.quantity = null;
      });
    }
  }
]);

myApp.controller("ManageWishlistsCtrl", ['$scope', 'userFactory', 'AuthenticationFactory', 'WishlistFactory', 'CategoryFactory',
  function($scope, userFactory, AuthenticationFactory, WishlistFactory, CategoryFactory) {

    // TODO: work on filters

    $scope.vm = {};
    $scope.wishlists = [];

    var user = JSON.parse(AuthenticationFactory.user);
    
    // Access the factory and get the latest users list
    WishlistFactory.getAllWishlists().then(function(data) {
      $scope.vm.wishlists = data.data.data;
      $scope.vm.created_by = $scope.vm.wishlists.created_by;
      $scope.vm.wishes = $scope.vm.wishlists.wishes;

      console.log($scope.vm.wishlists);
      $scope.filter = [];
      $scope.vm.wishlists.forEach(function(val){
        //console.log(val.approved);
        $scope.filter.push(val.approval_status);
      });
    
      $scope.wishlistFilter = function (ids) {
        
            return function (item) {
              var filter = $scope.filter;
              
                 //return filter.indexOf(item.id) !== -1;     
                 return filter.indexOf(item.approval_status);     
              }
       }
       //$scope.quantity = 4;
    });

    $scope.loadNewFilter = function (filter){
        console.log(filter);
        $scope.filter = filter;
        //$scope.filter = [1,5];
        //$scope.filter = [sf];
        //$scope.$apply();
    }

    $scope.approve = function(status){
      WishlistFactory.getAllWishlists().then(function(data) {
        $scope.vm.wishlists = data.data.data;
        $scope.vm.created_by = $scope.vm.wishlists.created_by;
        $scope.vm.wishes = $scope.vm.wishlists.wishes;

        console.log($scope.vm.wishlists);
        $scope.filter = [];
        $scope.vm.wishlists.forEach(function(val){
          //console.log(val.approved);
          $scope.filter.push(val.approval_status);
        });
      
        $scope.wishlistFilter = function (ids) {
          
              return function (item) {
                var filter = $scope.filter;
                
                   //return filter.indexOf(item.id) !== -1;     
                   return filter.indexOf(item.approval_status);     
                }
         }
         //$scope.quantity = 4;
      });
    }

  }
]);
