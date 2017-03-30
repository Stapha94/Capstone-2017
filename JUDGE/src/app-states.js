app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
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
        .state('login', {
            url: '/login',
            templateUrl: 'JUDGE/src/pages/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl'
        })
        .state('admin', {
            url: '/admin/:adminId',
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
                        }],
                        posters: ['posterService', 'localStorageService', (posterService, localStorageService) => {
                            return posterService.get({summitId: localStorageService.get('summit')})
                                .then((data) => {
                                    return data;
                                })
                        }]
                    }
                }
            }
        })
        .state('admin.judge', {
            url: '/judge/:judgeId',
            views: {
                'admin': {
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
                        }]
                    }
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
        .state('register-finish', {
            url: '/register-finish',
            templateUrl: 'JUDGE/src/pages/register/register-finish.html',
            controller: 'registerController',
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
                    return judgeService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }]
            }
        })
        .state('judge', {
            url: '/judge/:judgeId',
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
        .state('judge.dashboard', {
            url: '/dashboard',
            views: {
                'judge': {
                    templateUrl: 'JUDGE/src/pages/judge-dashboard/judge-dashboard.html',
                    controller: 'judgeDashboardController',
                    controllerAs: 'ctrl',
                    resolve: {
                        posters: ['judgePosterService', 'authService', (judgePosterService, authService) => {
                            return judgePosterService.get({judgeId: authService.currentUser.id})
                                .then((data) => {
                                    return data;
                                });  
                        }],
                        forms: ['formService', 'authService', (formService, authService) => {
                            return formService.get({judgeId: authService.currentUser.id})
                                .then((data) => {
                                    return data;
                                });
                        }]
                    }
                }
            }
        })
        .state('judge.form', {
            url: '/form/:posterId',
            views: {
                'judge': {
                    templateUrl: 'JUDGE/src/pages/judge-form/judge-form.html',
                    controller: 'judgeFormController',
                    controllerAs: 'ctrl',
                    resolve: {
                        form: ['formService', '$stateParams', (formService, $stateParams) => {
                            return formService.get({judgeId: $stateParams.judgeId, posterId: $stateParams.posterId})
                                .then((data) => {
                                    if(data.length === 1) {
                                        return data[0];
                                    } else {
                                        return {judgeId: $stateParams.judgeId, posterId: $stateParams.posterId};
                                    }
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
                }
            }
        });
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);