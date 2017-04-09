class AbstractModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/abstract-modal/abstract-modal.html';
        this.scope = {
            abstract: '='
        };
        this.controller = 'abstractModalController';
        this.controllerAs = 'ctrl';
    }

    link(scope, element, attribute, controller) {
        scope.$watch(() => { return scope.abstract}, (newVal, oldVal) => {
            controller.abstract = newVal;
        });
    }

    static directiveFactory() {
        AbstractModalDirective.instance = new AbstractModalDirective();
        return AbstractModalDirective.instance;
    }

}
app.directive('abstractModal', AbstractModalDirective.directiveFactory);