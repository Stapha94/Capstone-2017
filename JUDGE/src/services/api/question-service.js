class QuestionService {
    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
    }

    // Gets all the judges
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

        var url = this.baseUrl + 'questions' + paramString;
        this.$http.get(url)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        return deferred.promise;
    }

}

QuestionService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('questionService', QuestionService);