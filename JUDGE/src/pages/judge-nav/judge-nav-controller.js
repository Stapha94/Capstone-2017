class JudgeNavController {

    constructor($stateParams, $state, judge, authService) {
        this.authService = authService;
        this.judge = judge;
        this.loaded = false;
    }

    logout() {
        this.authService.logout();
    }
}

JudgeNavController.$inject = ['$stateParams', '$state', 'judge', 'authService'];
app.controller('judgeNavController', JudgeNavController);