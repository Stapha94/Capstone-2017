class JudgePosterService {

    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
        this.judgeParam = '';
        this.posterParam = '';
    }

    get(judgeId, posterId) {
        var deferred = this.$q.defer();

        if(judgeId !== undefined) {
            this.judgeParam = 'judge/' + judgeId;
        }

        if(posterId !== undefined) {
            this.posterParam = 'poster/' + posterId;
        }

        var url = this.baseUrl + 'judge_posters/' + this.judgeParam + this.posterParam;
        this.$http.get(url)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((response) => {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

}

JudgePosterService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('judgePosterService', JudgePosterService);