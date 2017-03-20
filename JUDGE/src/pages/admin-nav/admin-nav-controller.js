class AdminNavController {

    constructor($scope, $stateParams, $state, admin, summitId, authService) {
        this.authService = authService;
        this.admin = admin;
        $scope.summitId = summitId;
        $state.go('admin.dashboard');
    }

    logout() {
        this.authService.logout();
    }
}

AdminNavController.$inject = ['$scope', '$stateParams', '$state', 'admin', 'summitId', 'authService'];
app.controller('adminNavController', AdminNavController);