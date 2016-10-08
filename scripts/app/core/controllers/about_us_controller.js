(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('aboutUsController', aboutUsController);
  
  aboutUsController.$inject = ['$scope'];  

  function aboutUsController($scope) {

    $scope.hello = 'this is working';
    
    activate();

    function activate(){

    }
    
  }
  
})();