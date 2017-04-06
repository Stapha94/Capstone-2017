class AdminNavController {

    static resolve() {
        return {
                admin: ['adminService', '$stateParams', (adminService, $stateParams) => {
                    return adminService.get({adminId: $stateParams.id })
                        .then((data) => {
                            return data[0];
                        })
                }],
                summitId: ['summit', (summit) => {
                    return summit.summitId;
                }]
            }
    }

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