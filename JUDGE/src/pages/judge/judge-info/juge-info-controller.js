class JudgeInfoController {

    static resolve() {
        return {
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }]
            }
    }

    constructor($scope, judge, judgeCategories) {
        this.judge = judge;
        this.judgeCategories = judgeCategories;
    }

}

JudgeInfoController.$inject = ['$scope', 'judge', 'judgeCategories'];
app.controller('judgeInfoController', JudgeInfoController);