class MaterialModalDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.modal();
        });
    }

    static directiveFactory($timeout) {
        MaterialModalDirective.instance = new MaterialModalDirective($timeout);
        return MaterialModalDirective.instance;
    }
}

MaterialModalDirective.directiveName = 'materialModal';
MaterialModalDirective.$inject = ['$timeout'];
app.directive(MaterialModalDirective.directiveName, MaterialModalDirective.directiveFactory);