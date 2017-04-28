class PosterCategoryService extends BaseApiService {

    static serviceFactory($injector) {
        PosterCategoryService.instance = new PosterCategoryService($injector);
        return PosterCategoryService.instance;
    }

    constructor($injector) {
        super($injector, 'poster_categories', 'poster category');
    }

    delete(object) {
        super.update(object);
    }

}

PosterCategoryService.$inject = ['$injector'];
app.factory('posterCategoryService', PosterCategoryService.serviceFactory);