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
  // variables we will use later
  $scope.wines = [];
  $scope.wine = {};

  $http.get('http://daretodiscover.herokuapp.com/wines')
    .then(function(response) {
      // reversed the data to make newest wines appear on top
      $scope.wines = response.data.reverse();
    }
  );

  $scope.createWine = function() {
    $http.post('http://daretodiscover.herokuapp.com/wines', $scope.wine)
      .then(function(response) {
        var newWine = response.data;
        $scope.wine = {};
        $scope.wines.unshift(newWine);
      }
    );
  };

  $scope.deleteWine = function(wine) {
    $http.delete('http://daretodiscover.herokuapp.com/wines/' + wine.id)
      .then(function(response) {
        var wineIndex = $scope.wines.indexOf(wine);
        $scope.wines.splice(wineIndex, 1);
      }
    );
  };
}]);

app.controller('WinesShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $scope.wine = {};
  $http.get('http://daretodiscover.herokuapp.com/wines/' + $routeParams.id)
    .then(function(response) {
      $scope.wine = response.data;
    }
  );
}]);