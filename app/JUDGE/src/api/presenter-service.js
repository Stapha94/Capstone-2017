app.factory('presenterService', ['$window', '$log', '$http', '$q', 'CONFIG',
    function($window, $log, $http, $q, CONFIG) {
        var service = {};

        // This gets all presenters and links to get_all_presenters in the backend
        service.getPresenters = function() {
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

        service.create = function(presenter) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'presenter/create';
            $http.post(url, JSON.stringify(presenter))
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                var htmlError = angular.element(error.data);
                $window.alert(htmlError);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return service;
    }
])