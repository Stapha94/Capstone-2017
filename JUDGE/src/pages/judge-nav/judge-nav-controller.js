class JudgeNavController {

    static resolve() {
        return {
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get({judgeId: $stateParams.judgeId})
                        .then((data) => {
                            return data[0];
                        })
                }]
            }
    }

    constructor($scope, judge, authService) {
        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.user = judge;
    }
}

JudgeNavController.$inject = ['$scope', 'judge', 'authService'];
app.controller('judgeNavController', JudgeNavController);