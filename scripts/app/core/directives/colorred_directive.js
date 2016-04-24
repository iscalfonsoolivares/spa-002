(function() {
  
  'use strict';

  angular
      .module('app.core')
      .directive('colorRed', colorRed);

  function colorRed() {

    return function(scope, element, attrs){
      element.css("color", "blue");
    }
    
  }
  
  
})();    
