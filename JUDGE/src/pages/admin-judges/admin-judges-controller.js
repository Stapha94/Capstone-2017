class AdminJudgesController {

    static resolve() {
        return {
                judges: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get()
                        .then((data) => {
                            return data;
                        })
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, $state, $stateParams, judges, judgeCategories) {
        this.judges = judges;
        this.judgeCategories = judgeCategories;
    }

}

AdminJudgesController.$inject = ['$scope', '$state', '$stateParams', 'judges', 'judgeCategories'];
app.controller('adminJudgesController', AdminJudgesController);