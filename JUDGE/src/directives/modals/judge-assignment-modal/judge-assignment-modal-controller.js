class JudgeAssignmentModalController {

    constructor($scope, judgePosterService, assignedFilter) {
        this.judge = $scope.judge;
        this.posters = $scope.posters;
        this.judgePosterService = judgePosterService;
        this.assignedFilter = assignedFilter;
    }

    loadJudgePosters() {
        this.judgePosterService.get({ judgeId: this.judge.judgeId })
            .then((judgePosters) => {
                this.filteredPosters = this.assignedFilter(this.posters, judgePosters);
                this.judgePosters = judgePosters;
            })
    }

    add() {
        this.judgePoster = {
            judgeId: this.judge.judgeId,
            posterId: this.poster.posterId
        };
        this.judgePosterService.create(this.judgePoster);
    }

}

JudgeAssignmentModalController.$inject = ['$scope', 'judgePosterService', 'assignedFilter'];
app.controller('judgeAssignmentModalController', JudgeAssignmentModalController);