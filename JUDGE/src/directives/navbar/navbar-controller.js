class NavbarController {

    constructor(authService) {
        this.authService = authService;
        this.user = authService.currentUser;
    }

    logout(event) {
        angular.element(document.querySelector('.button-collapse')).sideNav('destroy');
        this.authService.logout();
    }

}

NavbarController.$inject = ['authService'];
app.controller('navbarController', NavbarController);