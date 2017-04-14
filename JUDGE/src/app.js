// global app declaration
app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-loading-bar'])
    .constant('CONFIG', {
        // This is the url for the database. Change it between local and host when needed.
        DBURL: 'http://localhost:8800/'
      //DBURL: 'https://qss-judge.heroku.com/'
    })
    .run(($log, $rootScope, routeInterceptor) => {
        // Set listener on state changes
        routeInterceptor.listenOnRoute();
    });