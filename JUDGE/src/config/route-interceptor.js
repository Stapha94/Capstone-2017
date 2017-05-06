class RouteInterceptor {

    constructor($log, $state, $rootScope, authService) {
        this.$log = $log;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.adminStates = [
            'home.admin',
            'home.admin.dashboard',
            'home.admin.users',
            'home.admin.summit',
            'home.admin.summit.management',
            'home.admin.admins',
            'home.admin.info',
            'home.admin.settings',
            'home.admin.settings.management',
            'home.admin.summit.summits',
            'home.admin.summit.info',
            'home.admin.settings.site',
            'home.admin.settings.site.institutions',
            'home.admin.settings.site.roles',
            'home.admin.settings.site.poster-categories',
            'home.admin.settings.site.judge-categories',
            'home.admin.settings.site.awards',
            'home.admin.settings.site.questions',
            'home.admin.settings.site.question-sections',
            'home.admin.reporting',
            'home.admin.awards',
            'home.admin.judges',
            'home.admin.judge',
            'home.admin.assign',
            'home.admin.presenters',
            'home.admin.presenter',
            'home.admin.register',
            'home.admin.register-institution',
            'home.admin.register-info'
            // ADD OTHER STATES HERE
        ];
        this.judgeStates = [
            'home.judge',
            'home.judge.dashboard',
            'home.judge.info',
            'home.judge.form'
        ];
        this.adminRegistrationStates = [
        ];
        this.registrationStates = [
            'register',
            'register-confirmation',
            'register-institution',
            'register-info',
            'register-finish'
        ];
    }

    listenOnRoute() {
        this.$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            // This ensures the registration process goes smoothly.
            if(_.includes(this.registrationStates, toState.name)) {
                if(toState.name === 'register-institution' && !toParams.valid) {
                    event.preventDefault();
                    this.$state.go('register');
                } else if(toState.name === 'register-info' && !toParams.valid) {
                    event.preventDefault();
                    this.$state.go('register');
                }
            }
            // No user is logged in
            if(!this.authService.isLoggedIn) {
                if(_.includes(this.judgeStates, toState.name)) {
                    event.preventDefault();
                    this.$log.warn('Non-judge attempted access to state: ' + toState.name);
                    this.$state.go('home.landing'); // redirect to judge login
                } else if(_.includes(this.adminStates, toState.name)) {
                    event.preventDefault();
                    this.$log.warn('Non-admin attempted access to state: ' + toState.name);
                    this.$state.go('home.landing'); // redirect to judge login
                }
            } else {
                // Judge is logged in
                if(this.authService.isJudge) {
                    if(_.includes(this.adminStates, toState.name)) {
                        event.preventDefault();
                        this.$log.warn('Non-admin attempted access to state: ' + toState.name);
                        this.$state.go('home.login'); // redirect to judge login
                    } else if(_.includes(this.judgeStates, toState.name)) {
                        // Checks to see if the user id matches the logged in id
                        if(toParams.judgeId !== this.authService.currentUser.id) {
                            event.preventDefault();
                            toParams.judgeId = this.authService.currentUser.id;
                            this.$state.go(toState.name, toParams);
                        }
                    } else if(toState.name === 'home.landing') {
                        event.preventDefault();
                        toParams.judgeId = this.authService.currentUser.id;
                        this.$state.go('home.judge.dashboard', toParams);
                    }
                }
                // Admin is logged in
                else if(this.authService.isAdmin) {
                    if(_.includes(this.judgeStates, toState.name)) {
                        event.preventDefault();
                        this.$log.warn('Non-judge attempted access to state: ' + toState.name);
                        this.$state.go('home.judge-login'); // redirect to judge login
                    } else if(_.includes(this.adminStates, toState.name)) {
                        // Checks to see if the user id matches the logged in id
                        if(toParams.adminId !== this.authService.currentUser.id) {
                            event.preventDefault();
                            toParams.adminId = this.authService.currentUser.id;
                            this.$state.go(toState.name, toParams);
                            
                        }
                        if(toState.name === 'home.admin.register-institution' && !toParams.valid) {
                            event.preventDefault();
                            this.$state.go('home.admin.register');
                        } else if(toState.name === 'home.admin.register-info' && !toParams.valid) {
                            event.preventDefault();
                            this.$state.go('home.admin.register');
                        }
                    } else if(toState.name === 'home.landing') {
                        event.preventDefault();
                        toParams.judgeId = this.authService.currentUser.id;
                        this.$state.go('home.admin.dashboard', toParams);
                    }
                }
                if(toState.name === 'home.judge') {
                    event.preventDefault();
                    this.$state.go('home.judge.dashboard', {judgeId: toParams.judgeId});
                } else if(toState.name === 'home.admin') {
                    event.preventDefault();
                    this.$state.go('home.admin.dashboard', {adminId: toParams.adminId});
                }
            }
        });
    }

}

RouteInterceptor.$inject = ['$log', '$state', '$rootScope', 'authService'];
app.service('routeInterceptor', RouteInterceptor);
