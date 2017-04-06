class AbstractModalController {

    constructor($scope) {
        this.abstract = $scope.abstract;
    }

}

AbstractModalController.$inject = ['$scope'];
app.controller('abstractModalController', AbstractModalController);