class SettingsTableDirective {

    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.templateUrl = 'build/views/directives/settings-table/settings-table.html';
        this.scope = {
            title: '=',
            service: '=',
            models: '='
        };
        this.controller = 'settingsTableController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        SettingsTableDirective.instance = new SettingsTableDirective();
        return SettingsTableDirective.instance;
    }

}
app.directive('settingsTable', SettingsTableDirective.directiveFactory);