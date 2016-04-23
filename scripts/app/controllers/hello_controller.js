(function() {
  
  'use strict';

  angular
      .module('app')
      .controller('HelloController', HelloController);
  
  HelloController.$inject = ['$scope'];  

  function HelloController($scope) {

    $scope.hello = 'this is working';
    
    activate();

    function activate(){

    }
    
  }
  
})();    
