(function() {
  
  'use strict';

  angular
      .module('app.core')
      .service('filterService', filterService);
  
    function filterService() {
      
      var savedData = null;
      var filterArray = [];

      var saveData = function(data) {
          savedData = data;
      }

      var restoreData = function() {
          return savedData;
      }

      var addFilter = function(filter, column) {
          var index = -1;

          for(var i = 0; i < filterArray.length; i++) {
              if(filterArray[i].column == column) {
                  index = i;
                  break;
              }
          }

          if(index < 0) {
              index = filterArray.push({column: column, filter: []});
              index -= 1;
          }

          var filters = filterArray[index].filter;

          var i = $.inArray(filter, filters);
          if (i > -1) {
              filters.splice(i, 1);
          } else {
              filters.push(filter);
          }

          for(var i = 0; i < filterArray.length; i++) {
              if(filterArray[i].filter.length == 0) {
                  filterArray.splice(i, 1);
              }
          }
      }

      return {
          add: addFilter,
          filters: filterArray,
          saveData: saveData,
          restoreData: restoreData
      }
    
    }
    
})();