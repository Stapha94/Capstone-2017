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
        return this._currentUser;
    }

    get authToken() {
        return this._authToken;
    }

    set currentUser(data) {
        this.localStorageService.set('currentUser', data);
        this._currentUser = data;
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

    judgeLogin(email, pin) {
        var deferred = this.$q.defer();

        var url = this.baseUrl + 'authorize/judge';
        this.$http.post(url, {email: email, pin: pin})
            .then((response) => {
                this.$log.info('Login for user ' + email + ' successful!');
                this.currentUser = response.data.judge[0];
                this.authToken = response.data.token.jwt;
                deferred.resolve(response.data.judge[0]);
            })
            .catch((error) => {
                this.$log.error('Login for user ' + email + ' failed!');
                this.currentUser = null;
                this.authToken = null;
                deferred.reject(error);
            });
        return deferred.promise;
    }

    logout() {
        if(this.isJudge) {
            this.clearToken();
            this.$state.go('home.judge-login');
        } else if(this.isAdmin) {
            this.clearToken();
            this.$state.go('home.login');
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