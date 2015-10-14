var app = angular.module('wineApp', ['ngRoute']);

// routes
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      // some template & some url
    })
    .when('/wines/:id', {
      // ...
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

// wine index controller
app.controller('WinesIndexCtrl', ['$scope', '$http', function ($scope, $http) {
  var baseUrl = "http://daretodiscover.herokuapp.com/wines";
  $scope.wines = [];
  $scope.wine = {};

  // get all wines on page load
  $http.get(baseUrl)
    .then(function(response) {
      // success cb
    }
  );

  // add a wine on some user action
  $scope.createWine = function() {
    // success cb
  };

  // delete a wine on some user action
  $scope.deleteWine = function(wine) {
    // success cb
  };
}]);

// wine show controller
app.controller('WinesShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  var baseUrl = "http://daretodiscover.herokuapp.com/wines";
  $scope.wine = {};
  $http.get(baseUrl + $routeParams.id)
    .then(function(response) {
      // success cb
    }
  );
}]);