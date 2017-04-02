class JudgeTableController {

    constructor($scope, $stateParams, judgeService, judgeSummitService) {
        this.judgeService = judgeService;
        this.judgeSummitService = judgeSummitService;
        this.judges = _.filter($scope.judges, (judge) => {
           return judge.category === $stateParams.category || judge.category === $stateParams.category.charAt(0).toUpperCase() +  $stateParams.category.slice(1) 
        });
        this.judgeCategories = $scope.judgeCategories;
        this.judge = {active: 1};
        this.summitId = $scope.summitId;
    }

    add() {
        this.judgeService.create(this.judge)
            .then((judge) => {
                this.judges.push(judge);
                this.judgeSummitService.create({judgeId: judge.judgeId, summitId: this.summitId});
            });
    }

    cancel() {
        this.judge = {active: 1};
    }

    activate(judge) {
        judge.active = 1;
        this.judgeService.update(judge);
    }

    deactivate(judge) {
        judge.active = 0;
        this.judgeService.delete(judge);
    }

}

JudgeTableController.$inject = ['$scope', '$stateParams', 'judgeService', 'judgeSummitService'];
app.controller('judgeTableController', JudgeTableController);