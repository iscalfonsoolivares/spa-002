(function() {
  
  'use strict';

  angular
      .module('app.widgets.common')
      .directive('myTests', myTests);

  function myTests() {

    return {
              restrict: 'E',
              scope: false,
              replace: true,
              templateUrl: 'js/app/widgets/common/directives/templates/my_tests_template.html',
              link: link
           };
    
    function link( scope, element, attrs ){
        scope.popover = {
          "title": "Title",
          "content": "Hello Popover<br />This is a multiline message!"
        };      
    }
    
  }
  
})();   