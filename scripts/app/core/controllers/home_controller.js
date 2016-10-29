(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('homeController', homeController);
  
  homeController.$inject = ['$scope'];  

  function homeController($scope) {
    
    var vm = this;
    
    vm.isHome = true;
    vm.isItems = false;
    vm.isAboutUs = false;
    
    activate();

    function activate(){

    }
    
  }
  
})();