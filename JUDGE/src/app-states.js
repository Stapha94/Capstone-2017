app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'JUDGE/src/pages/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl'
        })
        //admin related states
        .state('login', {
            url: '/login',
            templateUrl: 'JUDGE/src/pages/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl'
        })
        .state('admin', {
            url: '/admin',
            abstract: true,
            templateUrl: 'JUDGE/src/pages/admin-dashboard/admin-nav.html'
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'admin': {
                    templateUrl: 'JUDGE/src/pages/admin-dashboard/admin-dashboard.html',
                    controller: 'adminDashboardController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.settings', {
            url: '/settings',
            views: {
                'admin': {
                    templateUrl: 'JUDGE/src/pages/admin-settings/admin-settings.html',
                    controller: 'adminSettingsController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.reporting', {
            url: '/reporting',
            views: {
                'admin': {
                    templateUrl: 'JUDGE/src/pages/admin-reporting/admin-reporting.html',
                    controller: 'adminReportingController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.judges', {
            url: '/judges',
            views: {
                'admin': {
                    templateUrl: 'JUDGE/src/pages/admin-judges/admin-judges.html',
                    controller: 'adminJudgesController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('admin.participants', {
            url: '/participants',
            views: {
                'admin': {
                    templateUrl: 'JUDGE/src/pages/admin-participants/admin-participants.html',
                    controller: 'adminParticipantsController',
                    controllerAs: 'ctrl'
                }
            }
        })
        // registration related states
        .state('register', {
            url: '/register',
            templateUrl: 'JUDGE/src/pages/registration/register.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-confirmation', {
            url: '/register-confirmation',
            templateUrl: 'JUDGE/src/pages/registration/register-confirmation.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-institution', {
            url: '/register-institution',
            templateUrl: 'JUDGE/src/pages/registration/register-institution.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-info', {
            url: '/register-info',
            templateUrl: 'JUDGE/src/pages/registration/register-info.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        .state('register-finish', {
            url: '/register-finish',
            templateUrl: 'JUDGE/src/pages/registration/register-finish.html',
            controller: 'registrationController',
            controllerAs: 'ctrl'
        })
        
        // judge related states
        .state('judge-login', {
            url: '/judge-login',
            templateUrl: 'JUDGE/src/pages/judge-login/judge-login.html',
            controller: 'judgeLoginController',
            controllerAs: 'ctrl',
            resolve: {
                judges: ['judgeService', (judgeService) => {
                    return judgeService.getUsernames()
                        .then((data) => {
                            return data;
                        });
                }]
            }
        })
        .state('judge', {
            url: '/judge/:id',
            templateUrl: 'JUDGE/src/pages/judge-nav/judge-nav.html',
            controller: 'judgeNavController',
            controllerAs: 'ctrl',
            resolve: {
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.getById($stateParams.id)
                        .then((data) => {
                            return data[0];
                        })
                }]
            }
        })
        .state('judge.dashboard', {
            url: '/dashboard',
            views: {
                'judge': {
                    templateUrl: 'JUDGE/src/pages/judge-dashboard/judge-dashboard.html',
                    controller: 'judgeDashboardController',
                    controllerAs: 'ctrl',
                    resolve: {
                        posters: ['posterService', 'authorizationService', (posterService, authorizationService) => {
                            return posterService.getJudgePosters(authorizationService.currentUser.id)
                                .then((data) => {
                                    return data;
                                });  
                        }]
                    }
                }
            }
        })
        .state('judge.form', {
            url: '/form/:id',
            views: {
                'judge': {
                    templateUrl: 'JUDGE/src/pages/judge-form/judge-form.html',
                    controller: 'judgeFormController',
                    controllerAs: 'ctrl'
                }
            }
        });
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);