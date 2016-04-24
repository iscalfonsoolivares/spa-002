(function() {
  
  'use strict';
  
  // Modules
  
  angular
      .module('app.core', [ 'mgcrea.ngStrap', 'restangular' ]);
  
  // Main module
  
  angular
      .module('app', ['ngRoute', 'app.core'])
      .config(config)
      .run(run);
  
  function config($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : 'assets/js/app/core/controllers/views/hello_view.html',
            controller  : 'HelloController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'assets/js/app/core/controllers/views/hello_view.html',
            controller  : 'HelloController'
        })
    
        .otherwise({
          redirectTo: '/home'
        })    

  }
  

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location){
    
    /*

    var SERVER_QA_NAME = "qa.jipow.com";
    var SERVER_PROD_NAME = "jipow.com";

    var GA_ID_QA = "UA-XXXXXXX-1";
    var GA_ID_PROD = "UA-XXXXXXX-2";

    switch( $location.host() ) {
      case SERVER_QA_NAME:
          ga('create', GA_ID_QA, 'auto');
        break;
      case SERVER_PROD_NAME:
          ga('create', GA_ID_PROD, 'auto');
        break;
    }

    $rootScope.$on('$viewContentLoaded', function(angularEvent, current, previous) {

      switch( $location.host() ) {
      case SERVER_QA_NAME:
      case SERVER_PROD_NAME:
          ga('send', 'pageview', $location.url());
        break;
      }

    });
    
    */

  }

   
})();  