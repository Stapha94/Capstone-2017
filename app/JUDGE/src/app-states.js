app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'src/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl'
        })
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'src/admin-dashboard/admin-nav.html'
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'admin': {
                    templateUrl: 'src/admin-dashboard/admin-dashboard.html',
                    controller: 'adminDashboardController',
                    controllerAs: 'ctrl'
                }
            }
        })
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);