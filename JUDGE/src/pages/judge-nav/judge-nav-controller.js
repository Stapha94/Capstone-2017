class JudgeNavController {

    constructor($stateParams, $state, judge, authorizationService) {
        this.authorizationService = authorizationService;
        this.judge = judge;
        this.loaded = false;
        $state.go('judge.dashboard');
    }

    logout() {
        this.authorizationService.logout();
    }
}

JudgeNavController.$inject = ['$stateParams', '$state', 'judge', 'authorizationService'];
app.controller('judgeNavController', JudgeNavController);