class AdminJudgeInfoController {

    constructor($scope, judgeService, judgePosterService, judge, judgeCategories, judgePosters, judgeSummits) {
        this.$scope = $scope;
        this.judgeService = judgeService;
        this.judgePosterService = judgePosterService;
        this.original = judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = judgeCategories;
        this.judgePosters = judgePosters;
        _.forEach(judgeSummits, (judgeSummit) => {
            judgeSummit.date = this.getSummitDate(judgeSummit);
        })
        this.judgeSummits = judgeSummits;
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.judgeService.update(this.judge)
            .then((data) => {
                this.canEdit = false;
                if(this.judge.judgeCategoryId !== this.original.judgeCategoryId) {
                    _.forEach(this.judgeCategories, (category) => {
                        if(this.judge.judgeCategoryId === category.judgeCategoryId) {
                            this.judge.category = category.title;
                        }
                    })
                }
                this.original = angular.copy(this.judge);
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

    getSummitDate(summit) {
        return new Date(summit.summitStart);
        
    }

}

AdminJudgeInfoController.$inject = ['$scope', 'judgeService', 'judgePosterService', 'judge', 'judgeCategories', 'judgePosters', 'judgeSummits'];
app.controller('adminJudgeInfoController', AdminJudgeInfoController);