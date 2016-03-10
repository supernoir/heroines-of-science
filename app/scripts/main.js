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

$scope.selectedMode = function(a) {
   console.log(a + " has been selected");  
};

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
       
       var disciplines = createDisciplines(response);
       var years = createYears(response);
       var nations = createNations(response);

       
        $scope.profile = response.data;
        
        $scope.disciplines = disciplines;
        $scope.nations = nations;
        $scope.years = years;
        console.log(years);
        
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


function createDisciplines(response) {
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
 return disciplines;   
}

function createYears(response) {
        var years = response.data.reduce(function(result, person){
        person.doc.year = parseInt(person.doc.year,10);
        var currentYear = person.doc.year;
        var currentCollection = null; 
        
        for (var i = 0; i < result.length; i++) {
            var collection = result[i];
           if (collection.year === currentYear) {
                currentCollection = collection;
            break;
            }
        }
        
        if (!currentCollection) {
            currentCollection = {
                year: currentYear,
                persons: [],
                }
                result.push(currentCollection);       
            }
        currentCollection.persons.push(person);
        return result
       },[]);
 years = years.sort(function(current, next){
      return current.year - next.year;
 });
 return years;   
}

function createNations(response) {
        var nations = response.data.reduce(function(result, person){
        var currentNation = person.doc.nation;
        var currentCollection = null; 
        
        for (var i = 0; i < result.length; i++) {
            var collection = result[i];
           if (collection.nation === currentNation) {
                currentCollection = collection;
            break;
            }
        }
        
        if (!currentCollection) {
            currentCollection = {
                nation: currentNation,
                persons: [],
                }
                result.push(currentCollection);       
            }
        currentCollection.persons.push(person);
        return result
       },[]);
 return nations;   
} 
  
}]);

