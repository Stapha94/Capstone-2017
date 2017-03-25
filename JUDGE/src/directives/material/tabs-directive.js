class MaterialTabsDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.tabs();
        });
    }

    static directiveFactory($timeout) {
        MaterialTabsDirective.instance = new MaterialTabsDirective($timeout);
        return MaterialTabsDirective.instance;
    }
}

MaterialTabsDirective.directiveName = 'materialTabs';
MaterialTabsDirective.$inject = ['$timeout'];
app.directive(MaterialTabsDirective.directiveName, MaterialTabsDirective.directiveFactory);