class JudgeLoginController {

    constructor($scope, $state, authService, judgeService, notificationService, judges) {
        this.pin = '';
        this.userName = '';
        this.notificationService = notificationService;
        this.authService = authService;
        this.judgeService = judgeService;
        this.$state = $state;
    }

    login() {
        this.authService.judgeLogin(this.userName, this.pin)
            .then((judge) => {
                this.$state.go('home.judge', {judgeId: judge.id});
            })
            .catch((error) => {
                this.notificationService.error('Incorrect login!');
            });
    }

}

JudgeLoginController.$inject = ['$scope', '$state', 'authService', 'judgeService', 'notificationService', 'judges'];
app.controller('judgeLoginController', JudgeLoginController);