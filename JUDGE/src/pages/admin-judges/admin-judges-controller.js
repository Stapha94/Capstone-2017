class AdminJudgesController {

    constructor($scope, $state, $stateParams, judges, judgeCategories) {
        this.judges = judges;
        this.judgeCategories = judgeCategories;
        this.tabs = []
        _.forEach(this.judgeCategories, (judgeCategory) => {
            var stateSuffix = judgeCategory.title.toLowerCase();
            this.tabs.push({ title: judgeCategory.title, state: 'home.admin.judges', url: '/'+stateSuffix, params: {category: stateSuffix}});
        });
    }

}

AdminJudgesController.$inject = ['$scope', '$state', '$stateParams', 'judges', 'judgeCategories'];
app.controller('adminJudgesController', AdminJudgesController);