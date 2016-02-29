angular.module('heroinesApp', [])

.controller('mainController', function($scope) {
  $scope.hello = "Hello World!";
  
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
  
})