class BaseApiService {
    constructor($injector, serviceUrl, serviceType) {
        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.$q = $injector.get('$q');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
        this.serviceUrl = serviceUrl;
        this.serviceType = serviceType;
    }

    // Regex found here: http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space
    get(params) {
        var deferred = this.$q.defer();

        var paramString = '';
        if(params) {
            paramString = '/';
            _.forOwn(params, (value, key) => {
                var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                paramString += newKey + '/' + value;
            });
        }

        var url = this.baseUrl + this.serviceUrl + paramString;
        this.$http.get(url)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject(error);
            })
        return deferred.promise;
    }

    create(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = {};
        if(object) {
            _.forOwn(object, (value, key) => {
                var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                backendSafeObject[newKey] = value;
            });
        }

        var url = this.baseUrl + this.serviceUrl + '/create';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully created ' + this.serviceType + '!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.success('Failed to create ' + this.serviceType + '!');
                deferred.reject(error);
            })
        return deferred.promise;
    } 


}

app.factory('baseApiService', BaseApiService);