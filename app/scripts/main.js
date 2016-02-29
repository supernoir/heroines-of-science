angular.module('heroinesApp', [])

.controller('mainController', function($scope) {
  $scope.hello = "Hello World!";
  
  $scope.card = {
      'first_name':'Maria',
      'last_name':'Goeppert Mayer',
      'nation':'USA',
      'year':'1963',
      'discipline':'Physics',      
  }
})