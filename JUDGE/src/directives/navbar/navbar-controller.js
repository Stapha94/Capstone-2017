class NavbarController {

    constructor($scope, authService, localStorageService) {
        this.authService = authService;
        this.user = authService.currentUser;
        this.summit = localStorageService.get('summit');
        $scope.$watch(() => { return authService.currentUser }, (newVal, oldVal) => {
            this.user = newVal;
        })
    }

    logout(event) {
        angular.element(document.querySelector('.button-collapse')).sideNav('destroy');
        this.authService.logout();
    }

}

NavbarController.$inject = ['$scope', 'authService', 'localStorageService'];
app.controller('navbarController', NavbarController);