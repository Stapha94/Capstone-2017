class AddQuestionModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-question-modal/add-question-modal.html';
        this.scope = {
            ctrl: '=',
            edit: '=',
            title: '='
        };
    }

    static directiveFactory() {
        AddQuestionModalDirective.instance = new AddQuestionModalDirective();
        return AddQuestionModalDirective.instance;
    }

}
app.directive('addQuestionModal', AddQuestionModalDirective.directiveFactory);