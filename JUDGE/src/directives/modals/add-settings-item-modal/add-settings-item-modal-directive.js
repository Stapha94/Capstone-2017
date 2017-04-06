class AddSettingsItemModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-settings-item-modal/add-settings-item-modal.html';
        this.scope = {
            ctrl: '=',
            title: '='
        };
    }

    static directiveFactory() {
        AddSettingsItemModalDirective.instance = new AddSettingsItemModalDirective();
        return AddSettingsItemModalDirective.instance;
    }

}
app.directive('addSettingsItemModal', AddSettingsItemModalDirective.directiveFactory);