class PosterService {

    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
    }

    getJudgePosters(judgeId) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'judge_posters/' + judgeId;
        this.$http.get(url)
            .then((response) => {
                deferred.resolve(response.data.posters);
            })
            .catch((response) => {
                deferred.reject(response.data.error);
            });
        return deferred.promise;
    }

}

PosterService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('posterService', PosterService);