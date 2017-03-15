class LandingController {

    constructor($scope, authService, localStorageService) {
        // Putting this here to test login
        this.authService = authService;
    }

    isJudgeLoggedIn() {
        if(this.authService.isLoggedIn()) {
            if(this.authService.isJudge()) {
                return true;
            }
        }
        return false;
    }

    isAdminLoggedIn() {
        if(this.authService.isLoggedIn()) {
            if(this.authService.isAdmin()) {
                return true;
            }
        }
        return false;
    }
}

LandingController.$inject = ['$scope', 'authService', 'localStorageService'];
app.controller('landingController', LandingController);