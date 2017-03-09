app.service('authorizationService', ['$http', '$log', '$q', 
    function($http, $log, $q) {
        
        this.getCurrentUser = function() {
            return this.currentUser;
        };

        this.setCurrentUser = function(user) {
            this.currentUser = user;
        };

        this.judgeLogin = function(username, pin) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'judge-login';
            $http.post(url, {username: username, pin: pin})
                .then(function(response) {
                    $log.info('Login for user ' + username + ' successful!');
                    setCurrentUser(response.data.judge);
                    deferred.resolve(response)
                })
                .catch(function(error) {
                    $log.error('Login for user ' + username + ' failed!');
                    setCurrentUser(null);
                    deferred.reject(error);
                });
            return deferred.promise;
        } 
    }
])