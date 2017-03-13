class JudgeLoginController {

    constructor($scope, $state, authorizationService, judgeService, notificationService) {
        this.correct = false;
        this.pin = '';
        this.user = {};
        this.notificationService = notificationService;
        this.authorizationService = authorizationService;
        this.judgeService = judgeService;
        this.$state = $state;
        this.loadJudges();
    }

    loadJudges() {
        this.judgeService.getUsernames()
            .then((data) => {
                if(data == null) {
                    data = {};
                }
                this.judges = data;
            })
            .catch((error) => {
                this.notificationService.error(error);
            });
    }

    login() {
        var judge = angular.fromJson(this.user);
        this.authorizationService.judgeLogin(judge, this.pin)
            .then((response) => {
                this.$state.go('judge', {id: judge.judgeId});
            })
            .catch((error) => {
                return error;
            });
    }

    checkPin() {
        if(this.pin == null) {
            this.pin = '';
        } else if(this.pin.length === 4) {
            this.authorizationService.checkPin(this.pin)
                .then((response) => {
                    this.correct = true;
                })
                .catch((reject) => {
                    this.notificationService.error('Incorrect pin!');
                });
        }
    }

}

JudgeLoginController.$inject = ['$scope', '$state', 'authorizationService', 'judgeService', 'notificationService'];
app.controller('judgeLoginController', JudgeLoginController);