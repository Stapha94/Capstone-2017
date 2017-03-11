app.controller('judgeNavController', ['$stateParams', '$state', 'judgeService', 'authorizationService',
    function($stateParams, $state, judgeService, authorizationService) {
        var ctrl = this;

        judgeService.get($stateParams.id)
            .then(function(judge) {
                ctrl.judge = judge;
            });
        this.logout = 
        $state.go('judge.dashboard');
    }
]);