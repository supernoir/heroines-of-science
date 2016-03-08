var heroinesApp = angular.module('heroinesApp', ['ngRoute']);

heroinesApp.config(function($locationProvider, $routeProvider, $httpProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })
            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'mainController'
            })
            .when('/add_heroine', {
                templateUrl : 'views/add_heroine.html',
                controller  : 'mainController'
 
            });
            $locationProvider.html5Mode(false);
    });


heroinesApp.controller('mainController', ['$scope','$http','$location', function($scope, $http, $location) {

  $http({
  method: 'GET',
  url: 'http://localhost:9001/heroines'
}).then(function successCallback(response) {
       console.log(response.status, "GET Heroines: " + response.statusText);
       console.log(response.data);
        $scope.profile = response.data;
  }, function errorCallback(response) {
      console.error(response.status, response.statusText);
  });  

$scope.addHeroine = function() {
    var data = $scope.heroine;
    console.log(data);
    $http.post('http://localhost:9001/add_heroine', data).
        success(function(data) {
            console.log("Successfully added Heroine");
        }).error(function(data) {
            console.error("Error in adding Heroine");
        })
    $location.path('/');
}  


  
}]);