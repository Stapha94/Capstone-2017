class JudgeCategoriesController extends BaseSiteController {

    static resolve() {
        return {
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(judgeCategoryService, judgeCategories) {
        super(judgeCategoryService, judgeCategories);
    }

}

JudgeCategoriesController.$inject = ['judgeCategoryService', 'judgeCategories'];
app.controller('judgeCategoriesController', JudgeCategoriesController);