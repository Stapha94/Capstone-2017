class JudgeModalController {

    constructor($scope, judgeService, judgeSummitService) {
        this.judge = {active: 1};
        this.judgeCategories = $scope.judgeCategories;
        this.judgeService = judgeService;
        this.judgeSummitService = judgeSummitService;
        this.summitId = $scope.summitId;
    }

    add() {
        this.judgeService.create(this.judge)
            .then((judge) => {
                this.judgeSummitService.create({judgeId: judge.judgeId, summitId: this.summitId});
            })
    }

}

JudgeModalController.$inject = ['$scope', 'judgeService', 'judgeSummitService'];
app.controller('judgeModalController', JudgeModalController);