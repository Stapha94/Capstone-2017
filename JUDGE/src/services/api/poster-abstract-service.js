class PosterAbstractService extends BaseApiService {
    constructor($injector) {
        super($injector, 'poster_abstracts', 'poster abstract');
    }

}

PosterAbstractService.$inject = ['$injector'];
app.factory('posterAbstractService', PosterAbstractService);