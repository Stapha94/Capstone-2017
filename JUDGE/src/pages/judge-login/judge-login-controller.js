app.controller('judgeLoginController', ['$scope', '$state',
    function($scope, $state) {
        // login stuff goes here
        $scope.judges = {};
        this.login = function() {
            $state.go('judge.dashboard');
        }
    }
]);