class JudgeNavController {

    constructor($stateParams, $state, judgeService, authorizationService) {
        this.authorizationService = authorizationService;
        judgeService.getById($stateParams.id)
            .then(function(judge) {
                this.judge = judge;
            });
        $state.go('judge.dashboard');
    }

    logout() {
        // Logout;
    }
}

JudgeNavController.$inject = ['$stateParams', '$state', 'judgeService', 'authorizationService'];
app.controller('judgeNavController', JudgeNavController);