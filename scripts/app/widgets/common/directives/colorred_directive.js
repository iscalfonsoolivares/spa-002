(function() {
  
  'use strict';

  angular
      .module('app.widgets.common')
      .directive('colorRed', colorRed);

  function colorRed() {

    return function(scope, element, attrs){
      element.css("color", "red");
    };
    
  }
  
})();    
