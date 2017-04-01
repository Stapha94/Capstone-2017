class SideTabsController {

    constructor($scope, $state, $element, $timeout) {
        this.tabs = $scope.tabs;
        this.active = $scope.active;
        _.forEach(this.tabs, (tab) => {
            if($state.is(tab.state)) {
                this.active = tab.title;
            }
        });
        $timeout(() => {
            $element.find('#'+this.active).addClass('active');
        }, 10);
        this.$element = $element;
    }

    setActiveTab(tab) {
        if(this.active !== tab) {
            this.$element.find('#'+this.active).removeClass('active');
            this.active = tab;
            this.$element.find('#'+this.active).addClass('active');
        }
    }

}

SideTabsController.$inject = ['$scope', '$state', '$element', '$timeout'];
app.controller('sideTabsController', SideTabsController);