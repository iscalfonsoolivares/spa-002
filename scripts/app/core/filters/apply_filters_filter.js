(function() {
  
  'use strict';

  angular
      .module('app.core')
      .filter('applyFilters', applyFilters);
  
  applyFilters.$inject = [ '$filter', 'filterService'];  
  
  function applyFilters( $filter, filterService ) {
    
	var filters = filterService.filters;

	return function(array, expression){
      
		var isEmpty = true;
      
		for(var prop in expression) {
			if(expression.hasOwnProperty(prop))
				isEmpty = false;
		}
		
		if(!isEmpty) {
			return $filter('filter')(array, expression);
		}
		
 		array = filterService.restoreData();
		
		if(filters.length == 0) {
			return array;
		}
      
		var out = array.filter(function(val, index) {		
			for(var i = 0; i < filters.length; i++) {
				var filter = filters[i].filter;
				var value = val[filters[i].column].trim();
				
				for(var j = 0; j < filter.length; j++){
					if(value.indexOf(filter[j]) > -1) {
						return true;
					}
				}

			}
			return false;
       	});
      
		return out;
    }
    
  };
  
  
})();