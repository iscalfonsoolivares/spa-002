(function() {
  
  'use strict';

  angular
      .module('app.core')
      .directive('stCustomFilter', stCustomFilter);
  
  stCustomFilter.$inject = [ 'filterService'];  

  function stCustomFilter(filterService) {

    return {
        restrict: 'A',
        require: '^stTable',
        scope: true,
        link: function(scope, element, attr, ctrl) {
            
            var tableState = ctrl.tableState();
            var filter = attr.stCustomFilter;
            var column = attr.stCustomFilterColumn;

            element.on('click', function(data) {              
				filterService.add(filter, column);				
                tableState.search.predicateObject = {};
                //ctrl.search(searchText, searchColumn);
                //console.log(tableState);
				ctrl.search();
                scope.$apply();
            })
        }
    };
    
  }
  
})();