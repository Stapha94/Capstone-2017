class AdminJudgesController {

    constructor($scope, judges, judgeCategories) {
        this.judgeCategories = judgeCategories;
        // dashboardy stuff wilst goeth here
        this.judges = judges;
    }

}

AdminJudgesController.$inject = ['$scope', 'judges', 'judgeCategories'];
app.controller('adminJudgesController', AdminJudgesController);