class LandingController {

    constructor($scope, authService, localStorageService, summit) {
        // Putting this here to test login
        this.authService = authService;
        localStorageService.set('summit', summit.summitId);
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

LandingController.$inject = ['$scope', 'authService', 'localStorageService', 'summit'];
app.controller('landingController', LandingController);