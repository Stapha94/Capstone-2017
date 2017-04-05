class SideTabsController {

    constructor($scope, $state, $element, $timeout) {
        this.$scope = $scope;
        this.tabs = $scope.tabs;
        this.active = $scope.active ? $scope.active : this.tabs[0].title;
        this.$state = $scope.state;
        this.paramCheck = $scope.paramCheck ? $scope.paramCheck : 'id';
        this.current = $scope.state.current; // Is always the current state
        this.active = this.current.sideTab === this.active ? this.active : this.current.sideTab; 
        $timeout(() => {
            $element.find('#'+this.active).addClass('active');
        }, 10);
        this.$element = $element;
        // Sets a listener on the current state to watch for a state change.
        // This helps ensure the correct tab is active.
        this.$scope.$watch(() => { return $state.current }, (newVal, oldVal) => {
            if(newVal.sideTab) {
                this.setActiveTab(newVal.sideTab);
            }
        });

        // Some tabs change depending on parameters instead of states
        this.$scope.$watch(() => { return $state.params }, (newVal, oldVal) => {
            if($state.params[this.paramCheck]) {
                var tab = capitalize($state.params[this.paramCheck]);
                this.setActiveTab(tab);
            }
        });
    }

    setActiveTab(tab) {
        if(this.active !== tab) {
            this.$element.find('#'+this.active).removeClass('active');
            this.active = tab;
            this.$element.find('#'+this.active).addClass('active');
        }
    }

    // Finds the active tab using the state and/or parameters.
    // If no parameters exist, the state is solely used.
    findActiveTab(state) {
        _.forEach(this.tabs, (tab) => {
            if(tab.params) {
                var equal = _.isEqualWith(this.$state, tab, (state, tab) => {
                    return state.params[this.paramCheck] === tab.params[this.paramCheck] &&
                            state.current.name === tab.state;
                });
                if(equal) {
                    this.setActiveTab(tab);
                }
            } else {
                if(state.name === tab.state) {
                    this.setActiveTab(tab);
                }
            }
        });
    }

}

SideTabsController.$inject = ['$scope', '$state', '$element', '$timeout'];
app.controller('sideTabsController', SideTabsController);