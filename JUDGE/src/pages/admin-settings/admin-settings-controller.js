class AdminSettingsController {

    constructor($scope, admins, summits) {
        this.admins = admins;
        this.summits = summits;
    }

}

AdminSettingsController.$inject = ['$scope', 'admins', 'summits'];
app.controller('adminSettingsController', AdminSettingsController);