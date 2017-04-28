class AdminsController extends BaseTableModelController {

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

    constructor($scope, adminService, notificationService, authService, admins) {
        super(adminService, admins);
        this.notificationService = notificationService;
        this.userId = authService.currentUser.id;
    }

    add() {
        if(this.model.email !== this.confirmEmail) {
            this.notificationService.error('Emails must match!');
        } else if(this.model.password !== this.confirmPassword) {
            this.notificationService.error('Passwords must match!');
        } else {
            super.add();
            this.confirmEmail = '';
            this.confirmPassword = '';
        }
    }

}

AdminsController.$inject = ['$scope', 'adminService', 'notificationService', 'authService', 'admins'];
app.controller('adminsController', AdminsController);