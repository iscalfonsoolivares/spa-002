(function() {
  
  'use strict';

  angular
      .module('app.core')
      .factory('requestService', requestService);
  
  requestService.$inject = ['$http', '$q'];

  function requestService( $http, $q ) {
    
    return {
      getContactsData: getContactsData
    }
    
    function getContactsData(){
      
      var request = $http({
          url: 'assets/js/app/core/services/data/contacts.json',
          method: 'GET'
      });      

      return request.then(handleSuccess, handleError);
      
    }
    
    function handleSuccess(response){
      return response.data;
    }
    
    function handleError( response ){
      
      if (! angular.isObject( response.data ) || ! response.data.message ) {
          return( $q.reject( "An unknown error occurred." ) );
      }
      
      // Otherwise, use expected error message.
      return $q.reject(response.data.message);

    }

  }
  
})();