class AdminLoginController {

    constructor($scope, $state, authService, notificationService) {
        this.$scope = $scope;
        this.$state = $state;
        this.authService = authService;
        this.notificationService = notificationService;
    }

    login() {
        if(this.email && this.password) {
            this.authService.adminLogin(this.email, this.password)
                .then((admin) => {
                    this.$state.go('home.admin', {adminId: admin.id});
                })
                .catch((error) => {
                    this.notificationService.error('Invalid username or password!');
                });
        }
    }

}

AdminLoginController.$inject = ['$scope', '$state', 'authService', 'notificationService'];
app.controller('adminLoginController', AdminLoginController);