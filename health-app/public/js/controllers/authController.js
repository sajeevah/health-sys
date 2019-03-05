function opdMainCtrl($scope, $state, AuthService, AUTH_EVENTS){
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    // alert for session out or auth error (later will add)
  });
};

function loginCtrl($scope, $state, AuthService){

  $scope.user = {
    email: '',
    password: ''
  }

  $scope.login = function(userTemp){
    $scope.user.email = userTemp.email;
    $scope.user.password = userTemp.password;
    AuthService.login($scope.user).then(function(msg) {
     $state.go('dashboards.home');
   }, function(errMsg) {
       alert("Email or Password Wrong ! ");
   });
  }

};

function signupCtrl($scope, $state, AuthService){

  $scope.user = {
    name: '',
    email: '',
    password: '',
    img: ''
  }

  $scope.test = function(u){
     alert(u.type);
  }

  $scope.signup = function(userTemp){
    $scope.user.name = userTemp.name;
    $scope.user.email = userTemp.email;
    $scope.user.password = userTemp.password;

    AuthService.register($scope.user).then(function(msg){
      $state.go('login');
      // successful alert
    }, function(errMsg){
      alert("Registration Fail");
    });
  }
};

function userCtrl($scope, $state, $http, AuthService, API_ENDPOINT){

  $scope.userDetails = "";

  $scope.logout = function(){
    AuthService.logout();
    $state.go('login');
  };

  $scope.getUserDetails = function(){
    $http.get(API_ENDPOINT.url + '/userDetails').then(function(result) {
      $scope.userDetails = result.data;
    });
  };

  $scope.getUserDetails();

};


angular
    .module('inspinia')
    .controller('opdMainCtrl', opdMainCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('signupCtrl', signupCtrl)
    .controller('userCtrl', userCtrl);
