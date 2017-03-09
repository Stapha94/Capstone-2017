app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/pages/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl'
        })
        //admin related states
        .state('login', {
            url: '/login',
            templateUrl: 'src/pages/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl'
        })
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'src/pages/admin-dashboard/admin-nav.html'
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'admin': {
                    templateUrl: 'src/pages/admin-dashboard/admin-dashboard.html',
                    controller: 'adminDashboardController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.settings', {
            url: '/settings',
            views: {
                'admin': {
                    templateUrl: 'src/pages/admin-settings/admin-settings.html',
                    controller: 'adminSettingsController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.reporting', {
            url: '/reporting',
            views: {
                'admin': {
                    templateUrl: 'src/pages/admin-reporting/admin-reporting.html',
                    controller: 'adminReportingController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.judges', {
            url: '/judges',
            views: {
                'admin': {
                    templateUrl: 'src/pages/admin-judges/admin-judges.html',
                    controller: 'adminJudgesController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.participants', {
            url: '/participants',
            views: {
                'admin': {
                    templateUrl: 'src/pages/admin-participants/admin-participants.html',
                    controller: 'adminParticipantsController',
                    controllerAs: 'ctrl'
                }
            }
        })
        // registration related states
        .state('register', {
            url: '/register',
            templateUrl: 'src/pages/registration/register.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-confirmation', {
            url: '/register-confirmation',
            templateUrl: 'src/pages/registration/register-confirmation.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-institution', {
            url: '/register-institution',
            templateUrl: 'src/pages/registration/register-institution.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-info', {
            url: '/register-info',
            templateUrl: 'src/pages/registration/register-info.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-finish', {
            url: '/register-finish',
            templateUrl: 'src/pages/registration/register-finish.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        
        // judge related states
        .state('judge-login', {
            url: '/judge-login',
            templateUrl: 'src/pages/judge-login/judge-login.html',
            controller: 'judgeLoginController',
            controllerAs: 'ctrl'
        })
        .state('judge', {
            url: '/judge',
            templateUrl: 'src/pages/judge-dashboard/judge-nav.html',
        })
        .state('judge.dashboard', {
            url: ':id/dashboard',
            views: {
                'judge': {
                    templateUrl: 'src/pages/judge-dashboard/judge-dashboard.html',
                    controller: 'judgeDashboardController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('judge.form', {
            url: '/form/:id',
            views: {
                'judge': {
                    templateUrl: 'src/pages/judge-form/judge-form.html',
                    controller: 'judgeFormController',
                    controllerAs: 'ctrl'
                }
            }
        });
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);