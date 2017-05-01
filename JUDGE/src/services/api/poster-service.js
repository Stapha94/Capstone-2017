class PosterService extends BaseApiService {

    static serviceFactory($injector) {
        PosterService.instance = new PosterService($injector);
        return PosterService.instance;
    }

    constructor($injector) {
        super($injector, 'posters', 'poster');
    }

    get(params) {
        return super.get(params)
            .then((posters) => {
                _.forEach(posters, (poster) => {
                    // Thanks IE
                    poster.submissionDate = new Date(poster.submissionDate.replace(/ /, 'T') + 'Z');
                })
                return posters;
            })
    }

}

PosterService.$inject = ['$injector'];
app.factory('posterService', PosterService.serviceFactory);