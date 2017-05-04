// global app declaration
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-loading-bar'])
    .constant('CONFIG', {
        // This is the url for the database. Change it between local and host when needed.
        DBURL: '[PRODUCTION_URL]'
      //DBURL: '[LOCAL_URL]'
    })
    .run(($log, $rootScope, routeInterceptor) => {
        // Set listener on state changes
        routeInterceptor.listenOnRoute();
    });