class PosterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'posters', 'poster');
    }
    createPoster(data) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'posters';
        this.$http.post(url, data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

}

PosterService.$inject = ['$injector'];
app.factory('posterService', PosterService);