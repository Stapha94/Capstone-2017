class AddAdminModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-admin-modal/add-admin-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddAdminModalDirective.instance = new AddAdminModalDirective();
        return AddAdminModalDirective.instance;
    }

}
app.directive('addAdminModal', AddAdminModalDirective.directiveFactory);