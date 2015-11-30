myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    /* 
    $scope.user = {
      email: 'arvind@myApp.com',
      password: 'pass123'
    };
    */ 
    

    $scope.login = function(isValid) {

      if(!isValid){
        //alert('Please fill form correctly');
        $scope.loginForm.submitted = true;
      } else {
        
        var email = $scope.user.email,
          password = $scope.user.password;

        if (email !== undefined && password !== undefined) {
          UserAuthFactory.login(email, password).success(function(data) {
            $scope.user = data.data;
            AuthenticationFactory.isLogged = true;
            //AuthenticationFactory.user = data.data.email;
            AuthenticationFactory.user = JSON.stringify(data.data);
            AuthenticationFactory.userRole = data.data.role;
            
            $window.sessionStorage.token = data.meta.token;
            //$window.sessionStorage.user = data.data.email; // to fetch the user details on refresh
            $window.sessionStorage.user = JSON.stringify(data.data); // to fetch the user details on refresh
            $window.sessionStorage.userRole = data.data.role; // to fetch the user details on refresh

            $location.path("/");

          }).error(function(status) {
            alert('Oops something went wrong!');
          });
        } else {
          alert('Invalid credentials');
        }
      }

    };

  }
]);

myApp.controller('SignupCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    /*
    $scope.user = {
      email: 'arvind@myApp.com',
      password: 'pass123'
    };
    */
    $scope.submitted = false;
    $scope.signup = function(isValid) {

      if(!isValid){
        //alert('Please fill form correctly');
        $scope.registrationForm.submitted = true;
        //return;
      } else {

        var full_name = $scope.user.full_name,
        email = $scope.user.email,
        password = $scope.user.password
        dob = $scope.user.dob,
        gender = $scope.user.gender; 

        if (email !== undefined && password !== undefined) {
          UserAuthFactory.signup(full_name, email, password, dob, gender).success(function(data) {
            console.log(data);
            console.log(data.data);
            /*
            AuthenticationFactory.isLogged = true;
            AuthenticationFactory.user = data.user.email;
            AuthenticationFactory.userRole = data.user.role;

            $window.sessionStorage.token = data.token;
            $window.sessionStorage.user = data.user.email; // to fetch the user details on refresh
            $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
            */
            //$location.path("/");

            if(data !== undefined && data.meta.success == true && data.data !== null){
              $location.path("/login");
            }
            else{
              $location.path("/signup");
            }

          }).error(function(status) {
            if(status !== undefined && status.meta.success == false && status.meta.code == 409){
              // consider using form validation instead
              alert(status.meta.message);
              return;
            }
            alert('Oops something went wrong during registration! ');
          });
        } else {
          alert('Invalid credentials at registration');
        }


      }
    };
  }
]);
