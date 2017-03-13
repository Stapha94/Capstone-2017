class AuthorizationInterceptor {

    constructor($injector) {
        // This is because services do not configure until runtime
        // We need to inject services that can't normally be injected here
        this.$injector = $injector;
    }

    // Proccesses each response to find the auth token, so we can store it for future requests.
    response(response) {
        if(response && response.headers) {
            var authToken = response.headers('auth_token');
            if(authToken) {
                var authorizationService = this.$injector.get('authorizationService');
                authenticationService.authToken(authToken);
            }
        }
        return response;
    }

}

AuthorizationInterceptor.$inject= ['$injector'];
app.service('authorizationInterceptor', AuthorizationInterceptor)
    .config(['$httpProvider', ($httpProvider) => {
        $httpProvider.interceptors.push('authorizationInterceptor');
    }]);