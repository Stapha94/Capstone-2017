class PosterAbstractService extends BaseApiService {
    constructor($injector) {
        super($injector, 'poster_abstract', 'poster abstract');
    }

    createAbstract(data) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'poster_abstract';
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

PosterAbstractService.$inject = ['$injector'];
app.factory('posterAbstractService', PosterAbstractService);