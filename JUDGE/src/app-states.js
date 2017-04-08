app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '',
            abstract: true,
            templateUrl: 'build/views/pages/home.html',
            controller: 'homeController',
            controllerAs: 'ctrl',
            resolve: HomeController.resolve()
        })
        .state('home.landing', {
            url: '/home',
            templateUrl: 'build/views/pages/landing/landing.html',
            controller: 'landingController',
            controllerAs: 'ctrl',
            hideSide: true
        })

        //admin related states
        
        .state('home.login', {
            url: '/login',
            templateUrl: 'build/views/pages/admin-login/admin-login.html',
            controller: 'adminLoginController',
            controllerAs: 'ctrl',
            hideNav: true
        })
        .state('home.admin', {
            url: '/admin/{adminId:[0-9]+}',
            abstract: true,
            templateUrl: 'build/views/pages/admin-nav/admin-nav.html',
            controller: 'adminNavController',
            controllerAs: 'ctrl',
            resolve: AdminNavController.resolve()
        })
        .state('home.admin.dashboard', {
            url: '/dashboard',
            templateUrl: 'build/views/pages/admin-dashboard/admin-dashboard.html',
            controller: 'adminDashboardController',
            controllerAs: 'ctrl'
        })
        .state('home.admin.admins', {
            url: '/admins',
            templateUrl: 'build/views/pages/admin-admins/admins.html',
            controller: 'adminsController',
            controllerAs: 'ctrl',
            resolve: AdminsController.resolve()
        })
        .state('home.admin.info', {
            url: '/info/{adminInfoId:[0-9]+}',
            templateUrl: 'build/views/pages/admin-admins/admin-info.html',
            controller: 'adminInfoController',
            controllerAs: 'ctrl',
            params: {
                admin: null
            },
            resolve: AdminInfoController.resolve()
        })
        .state('home.admin.settings', {
            url: '/settings',
            abstract: true,
            template: '<ui-view />'
        })
        .state('home.admin.settings.summits', {
            url: '/summits',
            templateUrl: 'build/views/pages/admin-settings/summits/summits.html',
            controller: 'summitsController',
            controllerAs: 'ctrl',
            resolve: SummitsController.resolve()
        })
        .state('home.admin.settings.summit', {
            url: '/summit/{summitId:[0-9]+}',
            templateUrl: 'build/views/pages/admin-settings/summits/summit-info.html',
            controller: 'summitInfoController',
            controllerAs: 'ctrl',
            resolve: SummitInfoController.resolve()
        })
        .state('home.admin.settings.site', {
            url: '',
            abstract: true,
            templateUrl: 'build/views/pages/admin-settings/admin-settings.html',
            controller: 'adminSettingsController',
            controllerAs: 'ctrl'
        })
        .state('home.admin.settings.site.institutions', {
            url: '/institutions',
            templateUrl: 'build/views/pages/admin-settings/institutions/institutions.html',
            controller: 'institutionsController',
            controllerAs: 'ctrl',
            sideTab: 'institutions',
            resolve: InstitutionsController.resolve()
        })
        .state('home.admin.settings.site.roles', {
            url: '/roles',
            templateUrl: 'build/views/pages/admin-settings/roles/roles.html',
            controller: 'rolesController',
            controllerAs: 'ctrl',
            sideTab: 'roles',
            resolve: RolesController.resolve()
        })
        .state('home.admin.settings.site.poster-categories', {
            url: '/poster-categories',
            templateUrl: 'build/views/pages/admin-settings/poster-categories/poster-categories.html',
            controller: 'posterCategoriesController',
            controllerAs: 'ctrl',
            sideTab: 'poster-categories',
            resolve: PosterCategoriesController.resolve()
        })
        .state('home.admin.settings.site.judge-categories', {
            url: '/judge-categories',
            templateUrl: 'build/views/pages/admin-settings/judge-categories/judge-categories.html',
            controller: 'judgeCategoriesController',
            controllerAs: 'ctrl',
            sideTab: 'judge-categories',
            resolve: JudgeCategoriesController.resolve()
        })
        .state('home.admin.settings.site.awards', {
            url: '/awards',
            templateUrl: 'build/views/pages/admin-settings/awards/awards.html',
            controller: 'awardsController',
            controllerAs: 'ctrl',
            sideTab: 'awards',
            resolve: AwardsController.resolve()
        })
        .state('home.admin.settings.site.questions', {
            url: '/questions',
            templateUrl: 'build/views/pages/admin-settings/questions/questions.html',
            controller: 'questionsController',
            controllerAs: 'ctrl',
            sideTab: 'questions',
            resolve: QuestionsController.resolve()
        })
        .state('home.admin.settings.site.question-sections', {
            url: '/question-sections',
            templateUrl: 'build/views/pages/admin-settings/question-sections/question-sections.html',
            controller: 'questionSectionsController',
            controllerAs: 'ctrl',
            sideTab: 'question-sections',
            resolve: QuestionSectionsController.resolve()
        })
        .state('home.admin.reporting', {
            url: '/reporting',
            templateUrl: 'build/views/pages/admin-reporting/admin-reporting.html',
            controller: 'adminReportingController',
            controllerAs: 'ctrl',
            resolve: AdminReportingController.resolve()
        })
        .state('home.admin.judges', {
            url: '/judges',
            templateUrl: 'build/views/pages/admin-judges/admin-judges.html',
            controller: 'adminJudgesController',
            controllerAs: 'ctrl',
            resolve: AdminJudgesController.resolve()
        })
        .state('home.admin.judge', {
            url: '/judge/{judgeId:[0-9]+}',
            templateUrl: 'build/views/pages/admin-judges/admin-judge-info.html',
            controller: 'adminJudgeInfoController',
            controllerAs: 'ctrl',
            resolve: AdminJudgeInfoController.resolve()
        })
        .state('home.admin.assign', {
            url: '/assign-posters',
            templateUrl: 'build/views/pages/admin-assign-posters/admin-assign-posters.html',
            controller: 'adminAssignPostersController',
            controllerAs: 'ctrl',
            resolve: AdminAssignPostersController.resolve()
        })
        .state('home.admin.presenters', {
            url: '/presenters',
            templateUrl: 'build/views/pages/admin-participants/admin-participants.html',
            controller: 'adminParticipantsController',
            controllerAs: 'ctrl',
            resolve: AdminParticipantsController.resolve()
        })

        // register related states
        
        .state('register', {
            url: '/register',
            templateUrl: 'build/views/pages/register/register.html',
            controller: 'registerController',
            controllerAs: 'ctrl'
        })
        .state('register-confirmation', {
            url: '/register-confirmation',
            templateUrl: 'build/views/pages/register-confirmation/register-confirmation.html',
            controller: 'registerConfirmationController',
            controllerAs: 'ctrl'
        })
        .state('register-institution', {
            url: '/register-institution',
            templateUrl: 'build/views/pages/register-institution/register-institution.html',
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
            templateUrl: 'build/views/pages/register-info/register-info.html',
            controller: 'registerInfoController',
            controllerAs: 'ctrl'
        })
        
        // judge related states

        .state('home.judge-login', {
            url: '/judge-login',
            templateUrl: 'build/views/pages/judge-login/judge-login.html',
            controller: 'judgeLoginController',
            controllerAs: 'ctrl',
            hideNav: true
        })
        .state('home.judge', {
            url: '/judge/{judgeId:[0-9]+}',
            abstract: true,
            templateUrl: 'build/views/pages/judge-nav/judge-nav.html',
            controller: 'judgeNavController',
            controllerAs: 'ctrl',
            resolve: JudgeNavController.resolve()
        })
        .state('home.judge.dashboard', {
            url: '/dashboard',
            templateUrl: 'build/views/pages/judge-dashboard/judge-dashboard.html',
            controller: 'judgeDashboardController',
            controllerAs: 'ctrl',
            resolve: JudgeDashboardController.resolve()
        })
        .state('home.judge.info', {
            url: '/info',
            templateUrl: 'build/views/pages/judge-info/judge-info.html',
            controller: 'judgeInfoController',
            controllerAs: 'ctrl',
            resolve: JudgeInfoController.resolve()
        })
        .state('home.judge.form', {
            url: '/form/{formId:[0-9]+}',
            templateUrl: 'build/views/pages/judge-form/judge-form.html',
            controller: 'judgeFormController',
            controllerAs: 'ctrl',
            resolve: JudgeFormController.resolve()
        });
    
    // default to landing page
    $urlRouterProvider.otherwise('/home');
}]);