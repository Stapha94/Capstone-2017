class AdminInfoController {

    static resolve() {
        return {
                admin: ['adminService', '$stateParams', (adminService, $stateParams) => {
                    if($stateParams.admin !== null) {
                        return $stateParams.admin;
                    } else {
                        return adminService.get({adminId: $stateParams.adminInfoId})
                            .then((data) => {
                                return data[0];
                            });
                    }
                }]
            }
    }

    constructor($scope, adminService, admin, authService, notificationService) {
        this.$scope = $scope;
        this.adminService = adminService;
        this.userId = authService.currentUser.id;
        this.notificationService = notificationService;
        this.original = admin;
        this.admin = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.canEdit = false;
        this.isSelf = false;
        if(this.admin.adminId === this.userId) {
            this.isSelf = true;
        }
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.adminService.update(this.admin)
            .then((data) => {
                this.canEdit = false;
                this.original = angular.copy(this.admin);
            })
            .catch((error) => {
                this.canEdit = false;
                this.admin = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.admin = angular.copy(this.original);
    }

    updatePassword() {
        if(this.newPassword !== this.confirmPassword) {
            this.notificationService.error('Passwords don\'t match!');
        } else if(this.newPassword == null) {
            this.notificationService.error('Please set a new password!');
        } else if(this.newPassword.length < 8) {
            this.notificationService.error('Please make password at least 8 characters long!');
        } else {
            var password = { adminId: this.original.adminId, newPassword: this.newPassword, oldPassword: this.oldPassword };
            this.adminService.updatePassword(password)
                .then((data) => {
                    this.resetPasswordFields();
                })
                .catch((error) => {
                    this.resetPasswordFields();
                });
        }
    }

    resetPasswordFields() {
        this.newPassword = null;
        this.oldPassword = null;
        this.confirmPassword = null;
    }

    cancelPassword() {
        this.canEdit = false;
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }

}

AdminInfoController.$inject = ['$scope', 'adminService', 'admin', 'authService', 'notificationService'];
app.controller('adminInfoController', AdminInfoController);