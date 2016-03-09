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

var nation = $scope.nation
$scope.selectNation = function() {
    console.log("It does something " + nation);
}

$scope.selectDiscipline = function(persons) {
    console.log(persons);
    $scope.cards = persons;
}

  $http({
  method: 'GET',
  url: 'http://localhost:9001/heroines'
}).then(function successCallback(response) {
       console.log(response.status, "GET Heroines: " + response.statusText);
       console.log(response.data);
       
       var disciplines = response.data.reduce(function(result, person){
        var currentDiscipline = person.doc.discipline;
        var currentCategory = null; 
        
        for (var i = 0; i < result.length; i++) {
            var category = result[i];
           if (category.discipline === currentDiscipline) {
                currentCategory = category;
            break;
            }
        }
        
        if (!currentCategory) {
            currentCategory = {
                discipline: currentDiscipline,
                persons: [],
                }
                result.push(currentCategory);       
            }
        currentCategory.persons.push(person);
        return result
       },[]);
       
       console.log(disciplines);
       
        $scope.profile = response.data;
        $scope.disciplines = disciplines;
        $scope.cards = $scope.profile;

        
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

