var app = angular.module('wineApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/index.html',
      controller: 'WinesIndexCtrl'
    })
    .when('/wines/:id', {
      templateUrl: 'templates/show.html',
      controller: 'WinesShowCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

app.controller('WinesIndexCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.wines = [];
  $scope.wine = {};

  $http.get('http://daretodiscover.herokuapp.com/wines')
    .then(function(response) {
      $scope.wines = response.data;
    }
  );

app.controller('WinesShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $scope.wine = {};
  $http.get('http://daretodiscover.herokuapp.com/wines/' + $routeParams.id)
    .then(function(response) {
      $scope.wine = response.data;
    }
  );
}]);