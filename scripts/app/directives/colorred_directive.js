(function() {
  
  'use strict';

  angular
      .module('app')
      .directive('colorRed', colorRed);

  function colorRed() {

    return function(scope, element, attrs){
      element.css("color", "red");
    }
    
  }
  
  
})();    
