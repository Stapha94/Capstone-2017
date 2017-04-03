class PresenterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'presenters', 'presenter');
    }

    delete(object) {
        super.update(object);
    }
    getPresenters() {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'presenters';
        this.$http.get(url)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        return deferred.promise;
    }

    createPresenter(data) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'presenters';
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

PresenterService.$inject = ['$injector'];
app.factory('presenterService', PresenterService);