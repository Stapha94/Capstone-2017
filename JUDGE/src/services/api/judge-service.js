app.factory('judgeService', ['$log', '$http', '$q', 'CONFIG',
    function($log, $http, $q, CONFIG) {

        var service = {};
        var url = CONFIG.DBURL;

        // Gets all the judges
        service.get = function() {
            var deferred = $q.defer();

            url += 'judges';
            $http.get(url)
                .then(function(response) {
                    deferred.resolve(response.data.judges);
                })
                .catch(function(error) {
                    deferred.reject(error);
                })

            return deferred.promise; 
        }

        // Gets the judge specified by the id
        service.get = function(id) {
            var deferred = $q.defer();

            url += 'judge/get/' + id;
            $http.get(url)
                .then(function(response) {
                    deferred.resolve(response.data.judge);
                })
                .catch(function(error) {
                    deferred.reject(error);
                })

            return deferred.promise;
        }

        return service;

    }
])