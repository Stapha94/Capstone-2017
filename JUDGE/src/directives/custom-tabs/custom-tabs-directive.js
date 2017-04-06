class CustomTabsDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.scope = {
            active: '='
        }
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        
    }

    static directiveFactory($timeout) {
        CustomTabsDirective.instance = new CustomTabsDirective($timeout);
        return CustomTabsDirective.instance;
    }
}

CustomTabsDirective.directiveName = 'customTabs';
CustomTabsDirective.$inject = ['$timeout'];
app.directive(CustomTabsDirective.directiveName, CustomTabsDirective.directiveFactory);