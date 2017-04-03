class AddJudgeModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'views/directives/modals/add-judge-modal/add-judge-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddJudgeModalDirective.instance = new AddJudgeModalDirective();
        return AddJudgeModalDirective.instance;
    }

}
app.directive('addJudgeModal', AddJudgeModalDirective.directiveFactory);