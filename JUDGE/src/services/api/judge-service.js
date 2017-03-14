class JudgeService {
    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
    }

    // Gets all the judges
    get() {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'judges';
        this.$http.get(url)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        return deferred.promise;
    }

    // Gets the specified judge
    getById(id) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'judge/get/' + id;
        this.$http.get(url)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            })

        return deferred.promise;
    }

    // Gets only the usernames
    getUsernames() {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'judge/usernames';
        this.$http.get(url)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject('Server error!');
            })
        return deferred.promise;
    }

}

JudgeService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('judgeService', JudgeService);