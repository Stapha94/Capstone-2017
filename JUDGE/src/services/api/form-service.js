class FormService extends BaseApiService {
    constructor($injector) {
        super($injector, 'forms', 'form');
    }

    delete(formId) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + this.serviceUrl + '/' + formId;
        this.$http.delete(url)
            .then((response) => {
                this.notificationService.success('Successfully deleted forms !');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to delete forms!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

}

FormService.$inject = ['$injector'];
app.factory('formService', FormService);