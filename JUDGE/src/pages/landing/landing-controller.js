class LandingController {
    constructor($scope, localStorageService) {
        // Putting this here to test login
        localStorageService.clear();
    }
}

LandingController.$inject = ['$scope', 'localStorageService'];
app.controller('landingController', LandingController);