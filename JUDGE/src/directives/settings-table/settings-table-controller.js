class SettingsTableController extends BaseSiteTableModelController {

    constructor($scope) {
        super($scope.service, $scope.models);
        this.editModal = false;
    }

    edit() {
        this.service.update(this.model)
            .then(() => {
                angular.element('.modal').modal('close');
                this.setEditModal();
                this.canEdit = false;
                this.model = { active: '1' };
            })
    }

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

SettingsTableController.$inject = ['$scope'];
app.controller('settingsTableController', SettingsTableController);