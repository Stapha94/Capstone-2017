class JudgeDashboardController {

    constructor($scope, $stateParams, posters) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.posters = posters;
    }

}

JudgeDashboardController.$inject = ['$scope', '$stateParams', 'posters'];
app.controller('judgeDashboardController', JudgeDashboardController);