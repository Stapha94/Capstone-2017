class MaterialSideNavDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.sideNav({
                closeOnClick: true
            });
        });
    }

    static directiveFactory($timeout) {
        MaterialSideNavDirective.instance = new MaterialSideNavDirective($timeout);
        return MaterialSideNavDirective.instance;
    }
}

MaterialSideNavDirective.directiveName = 'materialSideNav';
MaterialSideNavDirective.$inject = ['$timeout'];
app.directive(MaterialSideNavDirective.directiveName, MaterialSideNavDirective.directiveFactory);