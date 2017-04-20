class ReCaptchaService {

    static serviceFactory($injector) {
        ReCaptchaService.instance = new ReCaptchaService($injector);
        return ReCaptchaService.instance;
    }

    constructor($injector) {
        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.$q = $injector.get('$q');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
    }

    // Regex found here: http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space
    send(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + 'recaptcha' + '/send';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                if(response.data.success) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .catch((error) => {
                deferred.reject(error);
            })
        return deferred.promise;
    }

    sanitizeObject(object) {
        var backendSafeObject = {};
        if(object) {
            if(Array.isArray(object)) {
                backendSafeObject = [];
                var index = 0;
                _.forEach(object, (item) => {
                    backendSafeObject[index] = {};
                    _.forOwn(item, (value, key) => {
                        var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        backendSafeObject[index][newKey] = value;
                    });
                    index++;
                });
            } else {
                _.forOwn(object, (value, key) => {
                    var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                    backendSafeObject[newKey] = value;
                });
            }
        }
        return backendSafeObject;
    }


}

app.factory('reCaptchaService', ReCaptchaService.serviceFactory);