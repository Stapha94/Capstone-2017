class InstitutionsController {

    constructor($scope, institutions) {
        this.institutions = institutions;
    }

}

InstitutionsController.$inject = ['$scope', 'institutions'];
app.controller('institutionsController', InstitutionsController);