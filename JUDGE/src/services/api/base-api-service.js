class BaseApiService {
    constructor($injector, serviceUrl, serviceType) {
        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.$q = $injector.get('$q');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
        this.authService = $injector.get('authService');
        this.serviceUrl = serviceUrl;
        this.serviceType = serviceType;
    }

    // Regex found here: http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space
    get(params) {
        var deferred = this.$q.defer();

        var paramString = this.sanitizeParams(params);

        var url = this.baseUrl + this.serviceUrl + paramString;
        this.$http.get(url)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                if(error.status === 401) {
                    this.authService.logout();
                }
                deferred.reject(error);
            })
        return deferred.promise;
    }

    create(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + this.serviceUrl + '/create';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully created ' + this.serviceType + '!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to create ' + this.serviceType + '!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

    // Note: This method is also used for delete since we're just updating the active value to 0
    update(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + this.serviceUrl + '/update';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully updated ' + this.serviceType + '!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to update ' + this.serviceType + '!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

    sanitizeParams(params) {
        var paramString = '';
        if(params) {
            _.forOwn(params, (value, key) => {
                var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                paramString += '/' + newKey + '/' + value;
            });
        }
        return paramString;
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

app.factory('baseApiService', BaseApiService);