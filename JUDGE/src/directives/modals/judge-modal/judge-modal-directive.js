class JudgeModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'judge/src/directives/modals/judge-modal/judge-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        JudgeModalDirective.instance = new JudgeModalDirective();
        return JudgeModalDirective.instance;
    }

}
app.directive('judgeModal', JudgeModalDirective.directiveFactory);