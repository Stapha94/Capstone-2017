class JudgeModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'judge/src/directives/judge-modal/judge-modal.html';
        this.scope = {
            judgeCategories: '=',
            summitId: '='
        };
        this.controller = 'judgeModalController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        JudgeModalDirective.instance = new JudgeModalDirective();
        return JudgeModalDirective.instance;
    }

}
app.directive('judgeModal', JudgeModalDirective.directiveFactory);