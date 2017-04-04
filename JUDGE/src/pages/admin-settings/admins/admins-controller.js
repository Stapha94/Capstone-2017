class AdminsController {

    static resolve() {
        return {
                admins: ['adminService', (adminService) => {
                    return adminService.get()
                        .then((data) => {
                            return data;
                        });
                }]
            }
    }

    constructor($scope, admins) {
        this.admins = admins;
    }

}

AdminsController.$inject = ['$scope', 'admins'];
app.controller('adminsController', AdminsController);