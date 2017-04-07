class ViewJudgeScoresModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-judge-scores-modal/view-judge-scores-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        ViewJudgeScoresModalDirective.instance = new ViewJudgeScoresModalDirective();
        return ViewJudgeScoresModalDirective.instance;
    }

}
app.directive('viewJudgeScoresModal', ViewJudgeScoresModalDirective.directiveFactory);