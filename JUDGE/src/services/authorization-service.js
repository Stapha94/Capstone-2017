// use factories instead of services due to the way Promises work. We can't use 'this' in them.
app.factory('authorizationService', ['$http', '$log', '$q', '$window', 'CONFIG',
    function($http, $log, $q, $window, CONFIG) {

        var service = {};        

        service.getCurrentUser = function() {
            return service.currentUser;
        };

        service.setCurrentUser = function(user) {
            $window.localStorage.setItem('currentUser', user);
            service.currentUser = $window.localStorage.getItem('currentUser');
        };

        service.judgeLogin = function(username, pin) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'authorize/judge-login';
            $http.post(url, {judgeId: username, pin: pin})
                .then(function(response) {
                    if(response.data.data) {
                        $log.info('Login for user ' + username + ' successful!');
                        service.setCurrentUser(response.data.data.judge);
                        deferred.resolve(response)
                    } else if(response.data.error) {
                        $log.error('Login for user ' + username + ' failed!');
                        service.setCurrentUser(null);
                        deferred.reject(response.data.error);
                    }
                })
                .catch(function(error) {
                    $log.error('Login for user ' + username + ' failed!');
                    service.setCurrentUser(null);
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        service.checkPin = function(pin) {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'authorize/check-pin';
            $http.post(url, {pin: pin})
                .then(function(response) {
                    if(response.data.data) {
                        deferred.resolve(response.data.data);
                    } else if(response.data.error) {
                        deferred.reject(response.data.error);
                    }
                })
                .catch(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        service.logout = function() {
            var deferred = $q.defer();

            var url = CONFIG.DBURL + 'authorize/logout';
            $http.post(url)
            .then(function(response) {
                if(response.data.success) {
                    service.setCurrentUser(null);
                    deferred.resolve('Logout successful!');
                } else if(response.data.error) {
                    deferred.reject('Could not logout!');
                }
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        }

        service.isJudge = function(user) {
            return user.authorization === 2;
        }

        return service

    }
])