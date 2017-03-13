class AuthorizationService {

    constructor($http, $log, $state, $q, localStorageService, CONFIG) {
        this.$http = $http;
        this.$log = $log;
        this.$state = $state;
        this.$q = $q;
        this.localStorageService = localStorageService;
        this.baseUrl = CONFIG.DBURL;
        this.currentUser = this.localStorageService.get('currentUser');
        this.authToken = this.localStorageService.get('authToken');
    }

    get currentUser() {
        return this.localStorageService.get('currentUser');
    }

    set currentUser(data) {
        this.localStorageService.set('currentUser', data);
    }

    get authToken() {
        return this.localStorageService.get('authToken');
    }

    set authToken(token) {
        this.localStorageService.set('authToken', token);
        this._authToken = token;
        if(token) {
            this.$http.defaults.headers.common.Authorization = 'Bearer' + token;
        } else {
            this.$http.defaults.headers.common.Authorization = null;
        }
    }

    judgeLogin(user, pin) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'authorize/judge-login';
        this.$http.post(url, {judgeId: user.judgeId, userName: user.userName, pin: pin})
            .then((response) => {
                this.$log.info('Login for user ' + user.userName + ' successful!');
                this.currentUser = response.data.auth.judge;
                this.authToken = response.data.auth.token.jwt;
                deferred.resolve(response);
            })
            .catch((error) => {
                this.$log.error('Login for user ' + user.userName + ' failed!');
                this.currentUser = null;
                this.authToken = null;
                deferred.reject(error);
            });
        return deferred.promise;
    }

    checkPin(pin) {
            var deferred = this.$q.defer();

            var url = this.baseUrl + 'authorize/check-pin';
            this.$http.post(url, {pin: pin})
                .then((response) => {
                    deferred.resolve(response.data.success.correct);
                })
                .catch((response) => {
                    deferred.reject(response.error.message);
                });
            return deferred.promise;
    }

    logout() {
        if(this.isJudge()) {
            this.clearToken();
            this.$state.go('judge-login');
        } else if(this.isAdmin()) {
            this.clearToken();
            this.$state.go('login');
        }
    }

    clearToken() {
        this.currentUser = null;
        this.authToken = null;
        this.localStorageService.clear();
    }

    isAdmin() {
        if(this.currentUser !== null) {
            return this.currentUser.userType === 'Admin';
        }
        return false;
    }

    isJudge() {
        if(this.currentUser !== null) {
            return this.currentUser.userType === 'Judge';
        }
        return false;
    }

    isLoggedIn() {
        return this.currentUser !== null || this.authToken !== null;
    }



}

AuthorizationService.$inject = ['$http', '$log', '$state', '$q', 'localStorageService', 'CONFIG'];
app.factory('authorizationService', AuthorizationService);