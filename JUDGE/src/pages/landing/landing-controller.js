class LandingController {

    constructor(authService, localStorageService, summit) {
        this.authService = authService;
        localStorageService.set('summit', summit.summitId); // Sets the current active summit for the site.
    }

}

LandingController.$inject = ['authService', 'localStorageService', 'summit'];
app.controller('landingController', LandingController);