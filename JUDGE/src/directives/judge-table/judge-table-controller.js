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
                this.reset();
                this.setModal();
                this.judges.push(judge);
                this.judge = {active: 1};
            });
    }

    cancel() {
        this.judge = {active: 1};
        this.reset();
        this.setModal();
    }

    // Resets the select fields.
    // Based on: http://stackoverflow.com/questions/37399188/jquery-materialize-changing-select-option-back-to-disabled-select-on-clear
    reset() {
        var selects = angular.element(document.querySelectorAll('select'));
        _.forEach(selects, (select) => {
            select = angular.element(select);
            select.val('None'); //Different approach here required for some reason
            select.material_select();
        })
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