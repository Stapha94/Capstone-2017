class MaterialCollapsibleDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.collapsible();
        });
    }

    static directiveFactory($timeout) {
        MaterialCollapsibleDirective.instance = new MaterialCollapsibleDirective($timeout);
        return MaterialCollapsibleDirective.instance;
    }
}

MaterialCollapsibleDirective.directiveName = 'materialCollapsible';
MaterialCollapsibleDirective.$inject = ['$timeout'];
app.directive(MaterialCollapsibleDirective.directiveName, MaterialCollapsibleDirective.directiveFactory);