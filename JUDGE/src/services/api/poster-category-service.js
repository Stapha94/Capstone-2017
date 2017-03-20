class PosterCategoryService extends BaseApiService {
    constructor($injector) {
        super($injector, 'poster_categories', 'poster category');
    }

}

PosterCategoryService.$inject = ['$injector'];
app.factory('posterCategoryService', PosterCategoryService);