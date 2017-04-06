class PosterCategoriesController extends BaseSiteController {

    static resolve() {
        return {
                posterCategories: ['posterCategoryService', (posterCategoryService) => {
                    return posterCategoryService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(posterCategoryService, posterCategories) {
        super(posterCategoryService, posterCategories);
    }

}

PosterCategoriesController.$inject = ['posterCategoryService', 'posterCategories'];
app.controller('posterCategoriesController', PosterCategoriesController);