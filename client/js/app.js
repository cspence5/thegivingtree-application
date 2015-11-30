var myApp = angular.module('ngclient', ['ngRoute', 'ngMessages']);

myApp.config(function($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/search/:keywords', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/categories/:category', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/page1', {
      templateUrl: 'partials/page1.html',
      controller: 'Page1Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page2', {
      templateUrl: 'partials/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page3', {
      templateUrl: 'partials/page3.html',
      controller: 'Page3Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page4', {
      templateUrl: 'partials/page4.html',
      controller: 'Page4Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/wishlists/create', {
      templateUrl: 'partials/create_wishlist.html',
      controller: 'CreateWishlistCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/wishlists', {
      templateUrl: 'partials/wishlists.html',
      controller: 'WishlistsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/wishlists/:id', {
      templateUrl: 'partials/wishlist.html',
      controller: 'WishlistCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/wishlists/update/:id', {
      templateUrl: 'partials/create_wishlist.html',
      controller: 'CreateWishlistCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/wishlists/:id/create_wish', {
      templateUrl: 'partials/create_wish.html',
      controller: 'CreateWishCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/admin/wishlists', {
      templateUrl: 'partials/admin/manage_wishlists.html',
      controller: 'ManageWishlistsCtrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/login'
    });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
