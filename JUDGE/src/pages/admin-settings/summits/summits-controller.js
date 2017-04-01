class SummitsController {

    constructor($scope, summits) {
        this.summits = summits;
    }

}

SummitsController.$inject = ['$scope', 'summits'];
app.controller('summitsController', SummitsController);