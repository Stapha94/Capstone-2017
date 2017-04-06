class AddSummitModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-summit-modal/add-summit-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddSummitModalDirective.instance = new AddSummitModalDirective();
        return AddSummitModalDirective.instance;
    }

}
app.directive('addSummitModal', AddSummitModalDirective.directiveFactory);