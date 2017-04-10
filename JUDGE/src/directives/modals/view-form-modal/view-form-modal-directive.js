class ViewFormModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-form-modal/view-form-modal.html';
        this.scope = {
            form: '=',
            formQuestions: '='
        };
        this.controller = 'viewFormModalController';
        this.controllerAs = 'ctrl';
    }

    link(scope, element, attribute, controller) {
        scope.$watch(() => { return scope.form}, (newVal, oldVal) => {
            controller.form = newVal;
        });
        scope.$watch(() => { return scope.formQuestions}, (newVal, oldVal) => {
            controller.formQuestions = newVal;
            controller.setup();
        });
    }

    static directiveFactory() {
        ViewFormModalDirective.instance = new ViewFormModalDirective();
        return ViewFormModalDirective.instance;
    }

}
app.directive('viewFormModal', ViewFormModalDirective.directiveFactory);