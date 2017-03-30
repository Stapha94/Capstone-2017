class AdminJudgeInfoController {

    constructor($scope, judgeService, judge, judgeCategories) {
        this.$scope = $scope;
        this.judgeService = judgeService;
        this.original = judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = judgeCategories;
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.judgeService.update(this.judge)
            .then((data) => {
                this.canEdit = false;
            })
            .catch((error) => {
                this.canEdit = false;
                this.judge = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.judge = angular.copy(this.original);
    }

}

AdminJudgeInfoController.$inject = ['$scope', 'judgeService', 'judge', 'judgeCategories'];
app.controller('adminJudgeInfoController', AdminJudgeInfoController);