class SummitService extends BaseApiService {

    static serviceFactory($injector) {
        SummitService.instance = new SummitService($injector);
        return SummitService.instance;
    }

    constructor($injector) {
        super($injector, 'summits', 'summit');
    }

    get(params) {
        return super.get(params)
            .then((summits) => {
                _.forEach(summits, (summit) => {
                    summit.summitStart = new Date(summit.summitStart);
                    summit.summitEnd = new Date(summit.summitEnd);
                    summit.registrationDeadline = new Date(summit.registrationDeadline);
                })
                return summits;
            })
    }

    updatePin(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + this.serviceUrl + '/update_pin';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully updated pin!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to update pin! Make sure the old pin was correct!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

    delete(object) {
        super.update(object);
    }

}

SummitService.$inject = ['$injector'];
app.factory('summitService', SummitService.serviceFactory);