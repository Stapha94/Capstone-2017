app.controller('judgeLoginController', ['$scope', '$state', 'authorizationService', 'judgeService',
    function($scope, $state, authorizationService, judgeService) {
        var ctrl = this; //This is ugly, but it lets us use ctrl variables inside .then statements
        this.correct = false;
        this.pin = '';
        this.username = '';
        this.judges = {};
        judgeService.get()
            .then(function(judges) {
                ctrl.judges = judges;
            })
            .catch(function(error) {
                ctrl.error = true;
                ctrl.errorMessage = 'Server error!';
            })

        this.login = function(username, pin) {
            if(this.correct === true) {
                authorizationService.judgeLogin(this.username, this.pin)
                .then(function(response) {
                    $state.go('judge', {id: ctrl.username});
                })
                .catch(function(error) {
                    return error;
                });
            }
        }

        this.checkPin = function(pin) {
            if(this.pin == null) {
                this.pin = '';
            } else if(this.pin.length === 4) {
                authorizationService.checkPin(pin)
                .then(function(response) {
                    ctrl.correct = true;
                })
                .catch(function(reject) {
                    ctrl.error = true;
                    ctrl.errorMessage = reject.message;
                })
            }
            this.error = false; // For the notification directive
        }
    }
]);