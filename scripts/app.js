(function() {
  
  'use strict';
  
  // Main module
  
  angular
      .module('app', ['ngRoute', 'app.core'])
      .config(config)
      .run(run);
  
  function config($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : 'js/app/core/controllers/views/home_view.html',
            controller  : 'homeController',
            controllerAs: 'vm'
        })
    
        // route for the home page
        .when('/about-us', {
            templateUrl : 'js/app/core/controllers/views/about_us_view.html',
            controller  : 'aboutUsController',
            controllerAs: 'vm'
        })
    
        // route for the home page
        .when('/items', {
            templateUrl : 'js/app/core/controllers/views/items_view.html',
            controller  : 'itemsController',
            controllerAs: 'vm'
        })
    
        .otherwise({
          redirectTo: '/home'
        });    

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