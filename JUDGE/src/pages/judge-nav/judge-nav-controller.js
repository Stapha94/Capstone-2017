class JudgeNavController {

    constructor($stateParams, $state, judgeService, authorizationService) {
        this.authorizationService = authorizationService;
        this.judgeService = judgeService;
        this.judgeId = $stateParams.id;
        this.loaded = false;
        $state.go('judge.dashboard');
        this.getJudge();
    }

    getJudge() {
        this.judgeService.getById(this.judgeId)
            .then((judge) => {
                this.judge = judge;
                this.loaded = true;
        });
    }

    logout() {
        this.authorizationService.logout();
    }
}

JudgeNavController.$inject = ['$stateParams', '$state', 'judgeService', 'authorizationService'];
app.controller('judgeNavController', JudgeNavController);