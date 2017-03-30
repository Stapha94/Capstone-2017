class JudgeAssignmentModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'judge/src/directives/judge-assignment-modal/judge-assignment-modal.html';
        this.scope = {
            judge: '=',
            posters: '='
        };
        this.controller = 'judgeAssignmentModalController';
        this.controllerAs = 'ctrl';
    }

    link(scope, element, attribute, controller) {
        scope.$watch('judge', () => {
            controller.judge = scope.judge;
            controller.loadJudgePosters();
        });
    }

    static directiveFactory() {
        JudgeAssignmentModalDirective.instance = new JudgeAssignmentModalDirective();
        return JudgeAssignmentModalDirective.instance;
    }

}
app.directive('judgeAssignmentModal', JudgeAssignmentModalDirective.directiveFactory);