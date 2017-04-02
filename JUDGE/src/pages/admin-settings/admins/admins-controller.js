class AdminsController {

    constructor($scope, admins) {
        this.admins = admins;
    }

}

AdminsController.$inject = ['$scope', 'admins'];
app.controller('adminsController', AdminsController);