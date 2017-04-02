class AdminSettingsController {

    constructor($state) {
        this.tabs = [
            { title: 'Admins', state: 'home.admin.settings.admins' },
            { title: 'Summits', state: 'home.admin.settings.summits' },
            { title: 'Institutions', state: 'home.admin.settings.institutions'}
        ]
        $state.go('home.admin.settings.admins');
    }

}

AdminSettingsController.$inject = ['$state'];
app.controller('adminSettingsController', AdminSettingsController);