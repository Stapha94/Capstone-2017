class HomeController {
    constructor($scope , $state, authService) {
        $state.current.hideNav = $state.current.hideNav ? $state.current.hideNav : false; // This value can be used to make the navbar go away if we ever need it to.
        $scope.$state = $state;
        this.authService = authService;
        this.user = authService.currentUser;
    }
}

HomeController.$inject = ['$scope', '$state', 'authService'];
app.controller('homeController', HomeController);