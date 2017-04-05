class AdminSettingsController {

    constructor($state) {
        this.tabs = [
            { title: 'Summits', state: 'home.admin.settings.summits' },
            { title: 'Institutions', state: 'home.admin.settings.institutions'}
        ]

    }

}

AdminSettingsController.$inject = ['$state'];
app.controller('adminSettingsController', AdminSettingsController);