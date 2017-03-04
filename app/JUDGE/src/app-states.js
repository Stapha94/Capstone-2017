app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl'
        })
        //admin related states
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
        // registration related states
        .state('register', {
            url: '/register',
            templateUrl: 'src/registration/register.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);