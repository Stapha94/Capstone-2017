class AddRoleModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-role-modal/add-role-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddRoleModalDirective.instance = new AddRoleModalDirective();
        return AddRoleModalDirective.instance;
    }

}
app.directive('addRoleModal', AddRoleModalDirective.directiveFactory);