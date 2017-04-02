class JudgeEditorDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'JUDGE/src/directives/editors/judge-editor/judge-editor.html';
        this.replace = true;
        this.scope = {
            judge: '=',
            judgeCategories: '='
        }
        this.controller = 'judgeEditorController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        JudgeEditorDirective.instance = new JudgeEditorDirective();
        return JudgeEditorDirective.instance;
    }
}

app.directive('judgeEditor', JudgeEditorDirective.directiveFactory);