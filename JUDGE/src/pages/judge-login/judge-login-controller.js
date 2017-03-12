class JudgeLoginController {

    constructor($scope, $state, authorizationService, judgeService, notificationService) {
        this.correct = false;
        this.pin = '';
        this.username = '';
        this.notificationService = notificationService;
        this.authorizationService = authorizationService;
        this.judgeService = judgeService;
        this.$state = $state;
        this.loadJudges();
    }

    loadJudges() {
        this.judgeService.get()
            .then((data) => {
                if(data == null) {
                    data = {};
                }
                this.judges = data;
            })
            .catch((error) => {
                notificationService.error('Server error!');
            });
    }

    login(username, pin) {
        this.authorizationService.judgeLogin(this.username, this.pin)
            .then((response) => {
                this.$state.go('judge', {id: this.username});
            })
            .catch((error) => {
                return error;
            });
    }

    checkPin(pin) {
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