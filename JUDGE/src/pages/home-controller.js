class HomeController {
    constructor($scope , $state, authService, localStorageService, summit) {
        $state.current.hideNav = $state.current.hideNav ? $state.current.hideNav : false; // This value can be used to make the navbar go away if we ever need it to.
        $scope.$state = $state;
        this.authService = authService;
        this.user = authService.currentUser;
        localStorageService.set('summit', summit.summitId); // Sets the current active summit for the site.
    }
}

HomeController.$inject = ['$scope', '$state', 'authService', 'localStorageService', 'summit'];
app.controller('homeController', HomeController);