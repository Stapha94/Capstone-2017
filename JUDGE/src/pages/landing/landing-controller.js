class LandingController {

    constructor($scope, authorizationService, localStorageService) {
        // Putting this here to test login
        this.authorizationService = authorizationService;
    }

    isJudgeLoggedIn() {
        if(this.authorizationService.isLoggedIn()) {
            if(this.authorizationService.isJudge()) {
                return true;
            }
        }
        return false;
    }

    isAdminLoggedIn() {
        if(this.authorizationService.isLoggedIn()) {
            if(this.authorizationService.isAdmin()) {
                return true;
            }
        }
        return false;
    }
}

LandingController.$inject = ['$scope', 'authorizationService', 'localStorageService'];
app.controller('landingController', LandingController);