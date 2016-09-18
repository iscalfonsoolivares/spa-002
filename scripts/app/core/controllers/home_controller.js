(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('homeController', homeController);
  
  homeController.$inject = ['$scope'];  

  function homeController($scope) {

    $scope.hello = 'this is working';
    
    activate();

    function activate(){

    }
    
  }
  
})();    
