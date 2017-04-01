class SideTabsController {

    constructor($scope, $state, $element, $timeout) {
        this.$scope = $scope;
        this.tabs = $scope.tabs;
        this.active = $scope.active;
        this.state = $scope.state; // Is always the current state
        $timeout(() => {
            $element.find('#'+this.active).addClass('active');
        }, 10);
        this.$element = $element;
        // Sets a listener on the current state to watch for a state change.
        // This helps ensure the correct tab is active.
        // Normally, it would be old then new, but for some reason, it's not.
        this.$scope.$watch('state', (newVal, oldVal) => {
            this.findActiveTab(newVal);
        });
    }

    setActiveTab(tab) {
        if(this.active !== tab) {
            this.$element.find('#'+this.active).removeClass('active');
            this.active = tab;
            this.$element.find('#'+this.active).addClass('active');
        }
    }

    findActiveTab(state) {
        _.forEach(this.tabs, (tab) => {
            if(state.name === tab.state) {
                this.setActiveTab(tab.title);
            }
        });
    }

}

SideTabsController.$inject = ['$scope', '$state', '$element', '$timeout'];
app.controller('sideTabsController', SideTabsController);