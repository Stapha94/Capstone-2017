class JudgeEditorController {

    constructor($scope, authService, judgeService) {
        this.original = $scope.judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = $scope.judgeCategories;
        this.judgeService = judgeService;
        this.user = authService;
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.judgeService.update(this.judge)
            .then((data) => {
                this.canEdit = false;
                this.user.currentUser.userName = this.user.isJudge ? this.judge.userName : this.user.currentUser.userName;
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

}

JudgeEditorController.$inject = ['$scope', 'authService', 'judgeService'];
app.controller('judgeEditorController', JudgeEditorController);