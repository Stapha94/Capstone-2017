app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl'
        })
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);