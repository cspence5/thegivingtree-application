//var THE_GIVING_TREE_API_HOST = process.env.IP+":"+"3000";
//var THE_GIVING_TREE_API_HOST = process.env.IP;
var THE_GIVING_TREE_API_HOST = process.env.IP + ":" + "3000";

console.log(THE_GIVING_TREE_API_HOST);


//var THE_GIVING_TREE_API_HOST = process.env.IP + ":8080";
//var THE_GIVING_TREE_API_HOST = 'https://givingtrees.herokuapp.com:8080';
//var THE_GIVING_TREE_API_HOST = 'https://10.99.21.59:4000';


myApp.factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }

  return auth;
});

myApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(email, password) {
      return $http.post(THE_GIVING_TREE_API_HOST + '/login', {
        "email": email,
        "password": password
      });
    },
    signup: function(full_name, email, password, dob, gender) {
      return $http.post(THE_GIVING_TREE_API_HOST + '/register', {
        "full_name" : full_name,
        "email": email,
        "password": password,
        "dob" : dob,
        "gender" : gender
      });
    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.userRole;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userRole;

        $location.path("/login");
      }

    }
  }
});

myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {

      return response || $q.when(response);
    }
  };
});
