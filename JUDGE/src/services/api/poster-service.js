class PosterService extends BaseApiService {

    static serviceFactory($injector) {
        PosterService.instance = new PosterService($injector);
        return PosterService.instance;
    }

    constructor($injector) {
        super($injector, 'posters', 'poster');
    }

}

PosterService.$inject = ['$injector'];
app.factory('posterService', PosterService.serviceFactory);