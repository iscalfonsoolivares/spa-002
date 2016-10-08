 (function() {
  
  'use strict';

  angular
      .module('app.core')
      .controller('contactsController', contactsController);
   
  contactsController.$inject = ['$scope', 'requestService'];

  function contactsController($scope, requestService) {

    activate();

    function activate() {
      loadRemoteData();
    }

    function loadRemoteData(){
      requestService.getContactsData().then(applyRemoteData, errorRequest);
    }

    function applyRemoteData(data) {            
      $scope.contacts = data;
      console.log($scope.contacts);
    }
    
    function errorRequest(error){
      console.log('Error :' + error);
    }
    
    
  }
  
})();