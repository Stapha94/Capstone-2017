class AdminNavController {

    static resolve() {
        return {
                admin: ['adminService', '$stateParams', (adminService, $stateParams) => {
                    return adminService.get({adminId: $stateParams.id })
                        .then((data) => {
                            return data[0];
                        })
                }],
                summit: ['localStorageService', (localStorageService) => {
                    return localStorageService.get('summit');
                }]
            }
    }

    constructor($scope, $stateParams, $state, admin, summit, authService) {
        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.admin = admin;
        $scope.summitId = summit === undefined ? null : summit.summitId;
    }

    logout() {
        this.authService.logout();
    }
}

AdminNavController.$inject = ['$scope', '$stateParams', '$state', 'admin', 'summit', 'authService'];
app.controller('adminNavController', AdminNavController);