class JudgeInfoController {

    constructor($scope, judge, judgeCategories) {
        this.judge = judge;
        this.judgeCategories = judgeCategories;
    }

}

JudgeInfoController.$inject = ['$scope', 'judge', 'judgeCategories'];
app.controller('judgeInfoController', JudgeInfoController);