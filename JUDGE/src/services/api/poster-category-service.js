class PosterCategoryService extends BaseApiService {
    constructor($injector) {
        super($injector, 'poster_categories', 'poster category');
    }

    delete(object) {
        super.update(object);
    }

}

PosterCategoryService.$inject = ['$injector'];
app.factory('posterCategoryService', PosterCategoryService);