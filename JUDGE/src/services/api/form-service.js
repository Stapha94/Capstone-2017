class FormService extends BaseApiService {

    static serviceFactory($injector) {
        FormService.instance = new FormService($injector);
        return FormService.instance;
    }

    constructor($injector) {
        super($injector, 'forms', 'form');
    }

    delete(formId) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject({formId: formId});

        var url = this.baseUrl + this.serviceUrl + '/delete';
        this.$http.post(url, backendSafeObject)
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
app.factory('formService', FormService.serviceFactory);