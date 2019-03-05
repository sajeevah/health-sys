function AuthService($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  };

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  };

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    $http.defaults.headers.common.Authorization = authToken;
  };

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  };

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/login', user).then(function(result) {
        if (result.data.success) {
          console.log(result.data.token);
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
};

function AuthInterceptor($rootScope, $q, AUTH_EVENTS){

  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };

};

function useDetaisService($q, $http, API_ENDPOINT){

  return{
      getUserDetails : function(){
          return $q(function(resolve, reject) {
              $http.get(API_ENDPOINT.url + '/userDetails').then(function(result) {
                  if (result.data) {
                      resolve(result.data);
                  } else {
                      reject(result.data);
                  }
              })
          })
      }
  }

}

angular
    .module('inspinia')
    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })
    .constant('API_ENDPOINT', {
        url: 'http://localhost:3000'
    })
    .service('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('useDetaisService', useDetaisService)
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });