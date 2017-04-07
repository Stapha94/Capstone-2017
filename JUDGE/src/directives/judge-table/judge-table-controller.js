class JudgeTableController {

    constructor($scope, $stateParams, judgeService) {
        this.judgeService = judgeService;
        this.judges = $scope.judges;
        this.judgeCategories = $scope.judgeCategories;
        this.category = this.judgeCategories[0].judgeCategoryId;
        this.judge = {active: 1};
        this.summitId = $scope.summitId;
        this.modal = false;
    }

    add() {
        this.judgeService.create(this.judge)
            .then((judge) => {
                angular.element('.modal').modal('close');
                this.setModal();
                if(this.params.category === judge.category || this.params.category === judge.category.toLowerCase()) {
                    this.judges.push(judge);
                }
                this.judge = {active: 1};
            });
    }

    cancel() {
        this.judge = {active: 1};
        this.setModal();
    }

    activate(judge) {
        judge.active = 1;
        this.judgeService.update(judge);
    }

    deactivate(judge) {
        judge.active = 0;
        this.judgeService.delete(judge);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

}

JudgeTableController.$inject = ['$scope', '$stateParams', 'judgeService'];
app.controller('judgeTableController', JudgeTableController);