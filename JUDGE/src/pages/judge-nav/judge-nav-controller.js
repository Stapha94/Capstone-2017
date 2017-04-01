class JudgeNavController {

    constructor($scope, judge, authService) {
        $scope.navbar = { hideNav: false };
        this.authService = authService;
        this.user = judge;
    }
}

JudgeNavController.$inject = ['$scope', 'judge', 'authService'];
app.controller('judgeNavController', JudgeNavController);