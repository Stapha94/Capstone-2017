class AuthService {

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
            this.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
        } else {
            this.$http.defaults.headers.common.Authorization = null;
        }
    }

    adminLogin(email, password) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'authorize/admin';
        this.$http.post(url, {email: email, password: password})
            .then((response) => {
                this.$log.info('Login for user ' + email + ' successful!');
                this.currentUser = response.data.admin[0];
                this.authToken = response.data.token.jwt;
                deferred.resolve(response.data.admin[0]);
            })
            .catch((error) => {
                this.$log.error('Login for user ' + email + ' failed!');
                this.currentUser = null;
                this.authToken = null;
                deferred.reject(error);
            });
        return deferred.promise;
    }

    judgeLogin(userName, pin) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'authorize/judge';
        this.$http.post(url, {userName: userName, pin: pin})
            .then((response) => {
                this.$log.info('Login for user ' + response.data.judge[0].userName + ' successful!');
                this.currentUser = response.data.judge[0];
                this.authToken = response.data.token.jwt;
                deferred.resolve(response.data.judge[0]);
            })
            .catch((error) => {
                this.$log.error('Login failed!');
                this.currentUser = null;
                this.authToken = null;
                deferred.reject(error);
            });
        return deferred.promise;
    }

    logout() {
        if(this.isJudge) {
            this.clearToken();
            this.$state.go('judge-login');
        } else if(this.isAdmin) {
            this.clearToken();
            this.$state.go('login');
        }
    }

    clearToken() {
        this.currentUser = null;
        this.authToken = null;
    }

    get isAdmin() {
        if(this.currentUser !== null) {
            return this.currentUser.type === 'Admin';
        }
        return false;
    }

    get isJudge() {
        if(this.currentUser !== null) {
            return this.currentUser.type === 'Judge';
        }
        return false;
    }

    get isLoggedIn() {
        return this.currentUser !== null || this.authToken !== null;
    }



}

AuthService.$inject = ['$http', '$log', '$state', '$q', 'localStorageService', 'CONFIG'];
app.factory('authService', AuthService);