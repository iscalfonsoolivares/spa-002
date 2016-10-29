(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('itemsController', itemsController);
  
  itemsController.$inject = ['$scope', 'requestService', 'filterService'];  

  function itemsController($scope, requestService, filterService) {
    
    var vm = this;
    
    vm.isHome = false;
    vm.isItems = true;
    vm.isAboutUs = false;
    
    activate();

    function activate(){
      loadRemoteData();
    }
    
    function loadRemoteData(){
      requestService.getData().then(applyRemoteData, errorRequest);
    }

    function applyRemoteData( data ) {            
      vm.users = data;
      filterService.saveData( data );
    }
    
    function errorRequest(error){
      console.log('Error :' + error);
    }    
    
  }
  
})();