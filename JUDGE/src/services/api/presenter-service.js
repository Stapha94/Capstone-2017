app.service('presenterService', ['$window', '$log', '$http', '$q', 'CONFIG',
    function($window, $log, $http, $q, CONFIG) {
        // This gets all presenters and links to get_all_presenters in the backend
        this.getPresenters = function() {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'presenters';
            $http.get(url)
                .then(function(response) {
                    deferred.resolve(response.data)
                })
                .catch(function(error) {
                    $log.error(JSON.stringify(error));
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        this.create = function(presenter) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'presenter/create';
            $http.post(url, JSON.stringify(presenter))
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }
])