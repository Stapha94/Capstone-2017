class PasswordResetController {

    static resolve() {
        return {
            admin: ['adminService', '$stateParams', (adminService, $stateParams) => {
                return adminService.recoverAccount({resetToken: $stateParams.token})
                    .then((data) => {
                        if(data) {
                            return data;
                        } else {
                            return false;
                        }
                    })
            }]
        }
    }

    constructor($state, admin, adminService, notificationService) {
        if(!admin) {
            $state.go('home.landing');
        } else {
            this.admin = admin;
            this.adminService = adminService;
            this.newPass = "";
            this.confirmPass = "";
        }
        this.$state = $state;
    }

    updatePassword() {
        if(this.newPassword !== this.confirmPassword) {
            this.notificationService.error('Passwords don\'t match!');
        } else if(this.newPassword == null) {
            this.notificationService.error('Please set a new password!');
        } else if(this.newPassword.length < 8) {
            this.notificationService.error('Please make password at least 8 characters long!');
        } else {
            var password = { adminId: this.admin.adminId, password: this.newPassword};
            this.adminService.reset(password)
                .then((data) => {
                    this.$state.go('home.landing');
                })
                .catch((error) => {
                    this.newPassword = null;
                    this.confirmPassword = null;
                });
        }
    }

}

PasswordResetController.$inject = ['$state', 'admin', 'adminService', 'notificationService'];
app.controller('passwordResetController', PasswordResetController);