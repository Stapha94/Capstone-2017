app.controller('judgeFormController', ['$scope', '$state',
    function($scope, $state) {
        // form stuff
        $scope.questions = [{ description: 'Test question. Making it long just to get a sense of the space.', score: 0}];
        $scope.score

        this.submit = function() {
            $state.go('judge.dashboard');
        };
    }
])