class AddInstitutionModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-institution-modal/add-institution-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddInstitutionModalDirective.instance = new AddInstitutionModalDirective();
        return AddInstitutionModalDirective.instance;
    }

}
app.directive('addInstitutionModal', AddInstitutionModalDirective.directiveFactory);