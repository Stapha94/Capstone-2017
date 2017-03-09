app.controller('judgeFormController', ['$scope', '$state', 'questionService',
    function($scope, $state, questionService) {
        $scope.questions = {};

        $scope.scores = [
                { score: 1, label: 'poor' },
                { score: 2, label: 'adequate'},
                { score: 3, label: 'fair' },
                { score: 4, label: 'good' },
                { score: 5, label: 'excellent' }
            ];

        // form stuff
        questionService.getQuestions()
        .then(function(data) {
            $scope.questions = data.questions;
        });

        this.submit = function() {
            $state.go('judge.dashboard');
        };

        this.questionsLoaded = function() {
            return $scope.questions.length > 0;
        }
    }
])