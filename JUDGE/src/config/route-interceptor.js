class RouteInterceptor {

    constructor($log, $state, $rootScope, authService) {
        this.$log = $log;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.adminStates = [
            'admin',
            'admin.dashboard',
            'admin.settings',
            'admin.reporting',
            'admin.judges',
            'admin.participants'
        ];
        this.judgeStates = [
            'judge',
            'judge.dashboard',
            'judge.form'
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
            // No user is logged in
            if(!this.authService.isLoggedIn) {
                if(_.includes(this.judgeStates, toState.name)) {
                    event.preventDefault();
                    this.$log.warn('Non-judge attempted access to state: ' + toState.name);
                    this.$state.go('judge-login'); // redirect to judge login
                } else if(_.includes(this.adminStates, toState.name)) {
                    event.preventDefault();
                    this.$log.warn('Non-admin attempted access to state: ' + toState.name);
                    this.$state.go('login'); // redirect to judge login
                }
            }
        });
    }

}

RouteInterceptor.$inject = ['$log', '$state', '$rootScope', 'authService'];
app.service('routeInterceptor', RouteInterceptor);
