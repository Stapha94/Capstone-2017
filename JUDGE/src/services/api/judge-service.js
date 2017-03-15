class JudgeService {
    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
        this.params = { judge: ''};
    }

    // Gets all the judges
    get(judgeId) {
        var deferred = this.$q.defer();

        if(judgeId) {
            this.params.judge = 'judge/' + judgeId;
        }

        var url = this.baseUrl + 'judges/' + this.params.judge;
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

JudgeService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('judgeService', JudgeService);