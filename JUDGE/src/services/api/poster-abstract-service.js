class PosterAbstractService extends BaseApiService {

    static serviceFactory($injector) {
        PosterAbstractService.instance = new PosterAbstractService($injector);
        return PosterAbstractService.instance;
    }

    constructor($injector) {
        super($injector, 'poster_abstracts', 'poster abstract');
    }

}

PosterAbstractService.$inject = ['$injector'];
app.factory('posterAbstractService', PosterAbstractService.serviceFactory);