class JudgeLoginController {

    constructor($scope, $state, authService, notificationService) {
        this.pin = '';
        this.email = '';
        this.notificationService = notificationService;
        this.authService = authService;
        this.$state = $state;
    }

    login() {
        this.authService.judgeLogin(this.email, this.pin)
            .then((judge) => {
                this.$state.go('home.judge', {judgeId: judge.id});
            })
            .catch((error) => {
                this.notificationService.error('Incorrect login!');
            });
    }

}

JudgeLoginController.$inject = ['$scope', '$state', 'authService', 'notificationService'];
app.controller('judgeLoginController', JudgeLoginController);