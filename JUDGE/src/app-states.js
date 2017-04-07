app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'JUDGE/src/pages/home.html',
            controller: 'homeController',
            controllerAs: 'ctrl'
        })
        .state('home.landing', {
            url: '/home',
            templateUrl: 'JUDGE/src/pages/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl',
            resolve: {
                summit: ['summitService', (summitService) => {
                    return summitService.get({active: 1})
                        .then((data) => {
                            return data[0];
                        })
                }]
            }
        })

        //admin related states
        
        .state('home.login', {
            url: '/login',
            templateUrl: 'JUDGE/src/pages/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl',
            hideNav: true
        })
        .state('home.admin', {
            url: '/admin/{adminId:[0-9]+}',
            templateUrl: 'JUDGE/src/pages/admin-nav/admin-nav.html',
            controller: 'adminNavController',
            controllerAs: 'ctrl',
            resolve: {
                admin: ['adminService', '$stateParams', (adminService, $stateParams) => {
                    return adminService.get({adminId: $stateParams.id })
                        .then((data) => {
                            return data[0];
                        })
                }],
                summitId: ['localStorageService', (localStorageService) => {
                    return localStorageService.get('summit');
                }]
            }
        })
        .state('home.admin.dashboard', {
            url: '/dashboard',
            templateUrl: 'JUDGE/src/pages/admin-dashboard/admin-dashboard.html',
            controller: 'adminDashboardController',
            controllerAs: 'ctrl'
        })
        .state('home.admin.settings', {
            url: '/settings',
            templateUrl: 'JUDGE/src/pages/admin-settings/admin-settings.html',
            controller: 'adminSettingsController',
            controllerAs: 'ctrl'
        })
        .state('home.admin.settings.admins', {
            url: '/admins',
            templateUrl: 'JUDGE/src/pages/admin-settings/admins/admins.html',
            controller: 'adminsController',
            controllerAs: 'ctrl',
            sideTab: 'Admins',
            resolve: {
                admins: ['adminService', (adminService) => {
                    return adminService.get()
                        .then((data) => {
                            return data;
                        });
                }]
            }
        })
        .state('home.admin.settings.summits', {
            url: '/summits',
            templateUrl: 'JUDGE/src/pages/admin-settings/summits/summits.html',
            controller: 'summitsController',
            controllerAs: 'ctrl',
            sideTab: 'Summits',
            resolve: {
                summits: ['summitService', (summitService) => {
                    return summitService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
        })
        .state('home.admin.settings.institutions', {
            url: '/institutions',
            templateUrl: 'JUDGE/src/pages/admin-settings/institutions/institutions.html',
            controller: 'institutionsController',
            controllerAs: 'ctrl',
            sideTab: 'Institutions',
            resolve: {
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
        })
        .state('home.admin.reporting', {
            url: '/reporting',
            templateUrl: 'JUDGE/src/pages/admin-reporting/admin-reporting.html',
            controller: 'adminReportingController',
            controllerAs: 'ctrl'
        })
        .state('home.admin.judges', {
            url: '/judges/{category:[a-zA-Z]*}',
            templateUrl: 'JUDGE/src/pages/admin-judges/admin-judges.html',
            controller: 'adminJudgesController',
            controllerAs: 'ctrl',
            resolve: {
                judges: ['judgeService', (judgeService) => {
                    return judgeService.get()
                        .then((data) => {
                            return data;
                        })
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
        })
        .state('home.admin.judge', {
            url: '/judge/{judgeId:[0-9]+}',
            templateUrl: 'JUDGE/src/pages/admin-judges/admin-judge-info.html',
            controller: 'adminJudgeInfoController',
            controllerAs: 'ctrl',
            resolve: {
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get({judgeId: $stateParams.judgeId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
                forms: ['formService', 'judge', (formService, judge) => {
                    return formService.get({judgeId: judge.judgeId})
                        .then((data) => {
                            return data;
                        })
                }],
                posters: ['posterService', 'localStorageService', (posterService, localStorageService) => {
                    return posterService.get({summitId: localStorageService.get('summit')})
                        .then((data) => {
                            return data;
                        })
                }]
            }
        })
        .state('home.admin.participants', {
            url: '/participants',
            templateUrl: 'JUDGE/src/pages/admin-participants/admin-participants.html',
            controller: 'adminParticipantsController',
            controllerAs: 'ctrl'
        })

        // register related states
        
        .state('register', {
            url: '/register',
            templateUrl: 'JUDGE/src/pages/register/register.html',
            controller: 'registerController',
            controllerAs: 'ctrl'
        })
        .state('register-confirmation', {
            url: '/register-confirmation',
            templateUrl: 'JUDGE/src/pages/register-confirmation/register-confirmation.html',
            controller: 'registerConfirmationController',
            controllerAs: 'ctrl'
        })
        .state('register-institution', {
            url: '/register-institution',
            templateUrl: 'JUDGE/src/pages/register-institution/register-institution.html',
            controller: 'registerInstitutionController',
            controllerAs: 'ctrl',
            resolve: {
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get({active: 1 })
                        .then((data) => {
                            return data;
                        });
                }],

                roles: ['roleService', (roleService) => {
                    return roleService.get({active: 1 })
                        .then((data) => {
                            return data;
                        });
                }]

            }
        })
        .state('register-info', {
            url: '/register-info',
            templateUrl: 'JUDGE/src/pages/register-info/register-info.html',
            controller: 'registerInfoController',
            controllerAs: 'ctrl'
        })
        
        // judge related states

        .state('home.judge-login', {
            url: '/judge-login',
            templateUrl: 'JUDGE/src/pages/judge-login/judge-login.html',
            controller: 'judgeLoginController',
            controllerAs: 'ctrl',
            hideNav: true
        })
        .state('home.judge', {
            url: '/judge/{judgeId:[0-9]+}',
            templateUrl: 'JUDGE/src/pages/judge-nav/judge-nav.html',
            controller: 'judgeNavController',
            controllerAs: 'ctrl',
            resolve: {
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get({judgeId: $stateParams.judgeId})
                        .then((data) => {
                            return data[0];
                        })
                }]
            }
        })
        .state('home.judge.dashboard', {
            url: '/dashboard',
            templateUrl: 'JUDGE/src/pages/judge-dashboard/judge-dashboard.html',
            controller: 'judgeDashboardController',
            controllerAs: 'ctrl',
            resolve: {
                forms: ['formService', 'authService', (formService, authService) => {
                    return formService.get({judgeId: authService.currentUser.id})
                        .then((data) => {
                            return data;
                        });
                }]
            }
        })
        .state('home.judge.info', {
            url: '/info',
            templateUrl: 'JUDGE/src/pages/judge-info/judge-info.html',
            controller: 'judgeInfoController',
            controllerAs: 'ctrl',
            resolve: {
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get({judgeId: $stateParams.judgeId})
                        .then((data) => {
                            return data[0];
                        });
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }]
            }
        })
        .state('home.judge.form', {
            url: '/form/{formId:[0-9]+}',
            templateUrl: 'JUDGE/src/pages/judge-form/judge-form.html',
            controller: 'judgeFormController',
            controllerAs: 'ctrl',
            resolve: {
                form: ['formService', '$stateParams', (formService, $stateParams) => {
                    return formService.get({formId: $stateParams.formId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                formQuestions: ['form', 'formQuestionService', (form, formQuestionService) => {
                    if(form.formId) {
                        return formQuestionService.get({formId: form.formId})
                            .then((data) => {
                                return data;
                            });
                    } else {
                        return [];
                    }
                }],
                questionSections: ['questionSectionService', (questionSectionService) => {
                    return questionSectionService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
                questions: ['questionService', (questionService) => {
                    return questionService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
        });
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);