class AdminNavController {

    constructor($stateParams, $state, admin, authService) {
        this.authService = authService;
        this.admin = admin;
        $state.go('admin.dashboard');
    }

    logout() {
        this.authService.logout();
    }
}

AdminNavController.$inject = ['$stateParams', '$state', 'admin', 'authService'];
app.controller('adminNavController', AdminNavController);