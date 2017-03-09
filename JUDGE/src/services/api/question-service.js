app.service('questionService', ['$log', '$http', '$q', 'CONFIG',
    function($log, $http, $q, CONFIG) {
        // This gets all questions and links to get_all_questions in the backend
        this.getQuestions = function() {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'questions';
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

    }
])