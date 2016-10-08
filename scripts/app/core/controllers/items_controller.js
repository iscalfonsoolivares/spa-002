(function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('itemsController', itemsController);
  
  itemsController.$inject = ['$scope', 'requestService', 'filterService'];  

  function itemsController($scope, requestService, filterService) {
    
    activate();

    function activate(){
      loadRemoteData();
    }
    
    function loadRemoteData(){
      requestService.getData().then(applyRemoteData, errorRequest);
    }

    function applyRemoteData( data ) {            
      $scope.users = data;
      filterService.saveData( data );
    }
    
    function errorRequest(error){
      console.log('Error :' + error);
    }    
    
  }
  
})();