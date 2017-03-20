class PosterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'posters', 'poster');
    }

}

PosterService.$inject = ['$injector'];
app.factory('posterService', PosterService);