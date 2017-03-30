class AdminJudgesController {

    constructor($scope, judgeService, judgeSummitService, judges, judgeCategories, posters) {
        this.$scope = $scope;
        this.judgeService = judgeService;
        this.judgeSummitService = judgeSummitService;
        this.judges = judges;
        this.judgeCategories = judgeCategories;
        this.posters = posters;
        this.judge = {active: 1};
        this.summitId = $scope.summitId;
        this.tabs = []
        _.forEach(this.judgeCategories, (judgeCategory) => {
            this.tabs.push({name: judgeCategory.title});
        });
        this.tabs.push({name: 'Inactive'});
    }

    setJudge(judge) {
        this.selectedJudge = judge;
    }

    add() {
        this.judgeService.create(this.judge)
            .then((judge) => {
                this.judges.push(judge);
                this.judgeSummitService.create({judgeId: judge.judgeId, summitId: this.summitId});
            });
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

AdminJudgesController.$inject = ['$scope', 'judgeService', 'judgeSummitService', 'judges', 'judgeCategories', 'posters'];
app.controller('adminJudgesController', AdminJudgesController);