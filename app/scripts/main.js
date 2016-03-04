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
  
  $scope.card = {
      'first_name':'Maria',
      'last_name':'Goeppert Mayer',
      'nation':'USA',
      'year':'1963',
      'discipline':'Physics', 
      'desc':'The Fox jumps over the Nobel Laureate and he turns green.',      
  };

  $scope.nations = {
    'option_1': 'USA',
    'option_2': 'Germany',
    'option_3': 'Birma',
    'option_4': 'Israel',
    'option_5': 'France',
    'option_6': 'India'
  };

  $scope.years = {
    'option_1': '1901',
    'option_2': '1903',
    'option_3': '1911',
  };
  
  $scope.disciplines = {
    'option_1': 'Economics',
    'option_2': 'Physics',
    'option_3': 'Chemistry',
    'option_4': 'Literature',
    'option_5': 'Peace',
    'option_6': 'Medicine'
  };
  

$scope.addHeroine = function() {
    var data = $scope.heroine;  
    $http.post('http://localhost:9001/add_heroine', data).
        success(function(data) {
            console.log("Successfully added Heroine");
        }).error(function(data) {
            console.error("Error in adding Heroine");
        })
    $location.path('/');
}  


  
}]);