(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('aboutUsController', aboutUsController);
  
  aboutUsController.$inject = ['$scope'];  

  function aboutUsController($scope) {
    
    var vm = this;
    
    vm.isHome = false;
    vm.isItems = false;
    vm.isAboutUs = true;
    
    activate();

    function activate(){

    }
    
  }
  
})();