app.controller('judgeLoginController', ['$scope', '$state', 'authorizationService',
    function($scope, $state, authorizationService) {
        $scope.pin = '';
        var currentRequest = false;
        var correct = false;
        // login stuff goes here
        this.login = function(username, pin) {
            if(correct === true) {
                authorizationService.judgeLogin(username, pin)
                .then(function(response) {
                    $state.go('judge.dashboard', {judgeId: username});
                })
                .catch(function(error) {
                    return error;
                });
            } else {
                //show an error
            }

        }

        this.isPinCorrect = function(pin) {
            if($scope.pin.length === 4 && currentRequest === false && correct === false) {
                currentRequest = true;
                authorizationService.checkPin(pin)
                .then(function(response) {
                    correct = true;
                    currentRequest = false;
                    return response;
                })
                .catch(function(reject) {
                    correct = false;
                    currentRequest = false;
                    return reject;
                })
            }
            return correct;
        }
    }
]);