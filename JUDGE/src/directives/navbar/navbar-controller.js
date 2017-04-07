class NavbarController {

    constructor(authService, localStorageService) {
        this.authService = authService;
        this.user = authService.currentUser;
        this.summit = localStorageService.get('summit')
    }

    logout(event) {
        angular.element(document.querySelector('.button-collapse')).sideNav('destroy');
        this.authService.logout();
    }

}

NavbarController.$inject = ['authService', 'localStorageService'];
app.controller('navbarController', NavbarController);