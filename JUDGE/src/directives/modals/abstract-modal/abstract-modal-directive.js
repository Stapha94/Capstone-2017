class AbstractModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'views/directives/modals/abstract-modal/abstract-modal.html';
        this.scope = {
            abstract: '='
        };
        this.controller = 'abstractModalController';
        this.controllerAs = 'ctrl';
    }

    link(scope, element, attribute, controller) {
        scope.$watch('abstract', () => {
            controller.abstract = scope.abstract;
        });
    }

    static directiveFactory() {
        AbstractModalDirective.instance = new AbstractModalDirective();
        return AbstractModalDirective.instance;
    }

}
app.directive('abstractModal', AbstractModalDirective.directiveFactory);