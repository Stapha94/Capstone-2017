app.service('authorizationService', ['$http', '$log', '$q', '$window', 'CONFIG',
    function($http, $log, $q, $window, CONFIG) {
        
        this.getCurrentUser = function() {
            return this.currentUser;
        };

        this.setCurrentUser = function(user) {
            $window.localStorage.setItem('currentUser', user);
            this.currentUser = $window.localStorage.getItem('currentUser');
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

        this.checkPin = function(pin) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'judge-login/check-pin';
            $http.post(url, {pin: pin})
                .then(function(response) {
                    deferred.resolve(response)
                })
                .catch(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        } 
    }
])