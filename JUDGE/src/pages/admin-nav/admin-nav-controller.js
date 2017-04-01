class AdminNavController {

    constructor($scope, $stateParams, $state, admin, summitId, authService) {
        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.admin = admin;
        $scope.summitId = summitId;
    }

    logout() {
        this.authService.logout();
    }
}

AdminNavController.$inject = ['$scope', '$stateParams', '$state', 'admin', 'summitId', 'authService'];
app.controller('adminNavController', AdminNavController);