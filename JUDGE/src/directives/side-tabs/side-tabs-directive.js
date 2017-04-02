class SideTabsDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'judge/src/directives/side-tabs/side-tabs.html';
        this.scope = {
            tabs: '=',
            active: '=',
            state: '=',
            paramCheck: '='
        };
        this.controller = 'sideTabsController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        SideTabsDirective.instance = new SideTabsDirective();
        return SideTabsDirective.instance;
    }

}
app.directive('sideTabs', SideTabsDirective.directiveFactory);