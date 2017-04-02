class MaterialDropdownDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.dropdown({
                hover: true,
                belowOrigin: true
            });
        });
    }

    static directiveFactory($timeout) {
        MaterialDropdownDirective.instance = new MaterialDropdownDirective($timeout);
        return MaterialDropdownDirective.instance;
    }
}

MaterialDropdownDirective.directiveName = 'materialDropdown';
MaterialDropdownDirective.$inject = ['$timeout'];
app.directive(MaterialDropdownDirective.directiveName, MaterialDropdownDirective.directiveFactory);