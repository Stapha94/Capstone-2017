class SettingsTableController extends BaseSiteTableModelController {

    constructor($scope) {
        super($scope.service, $scope.models);
        this.editModal = false;
    }

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

SettingsTableController.$inject = ['$scope'];
app.controller('settingsTableController', SettingsTableController);