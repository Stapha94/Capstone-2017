class MaterialSelectDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.material_select();
        });
    }

    static directiveFactory($timeout) {
        MaterialSelectDirective.instance = new MaterialSelectDirective($timeout);
        return MaterialSelectDirective.instance;
    }
}

MaterialSelectDirective.directiveName = 'materialSelect';
MaterialSelectDirective.$inject = ['$timeout'];
app.directive(MaterialSelectDirective.directiveName, MaterialSelectDirective.directiveFactory);