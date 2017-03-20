class JudgeLoginController {

    constructor($scope, $state, authService, judgeService, notificationService, judges) {
        this.correct = false;
        this.pin = '';
        this.judgeId = 0;
        this.notificationService = notificationService;
        this.authService = authService;
        this.judgeService = judgeService;
        this.$state = $state;
        this.judges = judges;
    }

    login() {
        this.authService.judgeLogin(this.judgeId, this.pin)
            .then((response) => {
                this.$state.go('judge', {id: this.judgeId});
            })
            .catch((error) => {
                return error;
            });
    }

    checkPin() {
        if(this.pin == null) {
            this.pin = '';
        } else if(this.pin.length === 4) {
            this.authService.checkPin(this.pin)
                .then((response) => {
                    this.correct = true;
                })
                .catch((reject) => {
                    this.notificationService.error('Incorrect pin!');
                });
        }
    }

}

JudgeLoginController.$inject = ['$scope', '$state', 'authService', 'judgeService', 'notificationService', 'judges'];
app.controller('judgeLoginController', JudgeLoginController);