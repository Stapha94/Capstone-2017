class LandingController {

   constructor($scope, $state, authService, notificationService) {
        this.$scope = $scope;
        this.$state = $state;
        this.authService = authService;
        this.notificationService = notificationService;
    }

    login() {
        if(this.email && this.password) {
            this.authService.login(this.email, this.password)
                .then((user) => {
                    if(user.type === 'Admin') {
                        this.$state.go('home.admin.dashboard', {adminId: user.id});
                    } else if (user.type === 'Judge') {
                        this.$state.go('home.judge.dashboard', {judgeId: user.id});
                    }
                })
                .catch((error) => {
                    this.notificationService.error('Invalid username or password!');
                });
        }
    }

}

LandingController.$inject = ['$scope', '$state', 'authService', 'notificationService'];
app.controller('landingController', LandingController);