class JudgeDashboardController {

    constructor($scope, $state, $stateParams, forms) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.forms = forms;
        this.abstract = {};
        this.dividePosters();
    }

    setAbstract(poster) {
        this.abstract = {
            title: poster.posterTitle,
            objective: poster.objective,
            methods: poster.methods,
            results: poster.results,
            conclusion: poster.conclusion
        };
    }

    dividePosters() {
        _.forEach(this.forms, (form) => {
            if(form.total > 0) {
                form.isScored = true;
            } else {
                form.isScored = false;
            }
        });
    }

}

JudgeDashboardController.$inject = ['$scope', '$state', '$stateParams', 'forms'];
app.controller('judgeDashboardController', JudgeDashboardController);