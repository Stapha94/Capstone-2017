class JudgeDashboardController {

    constructor($scope, $state, $stateParams, posters, forms) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.posters = posters;
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
        _.forEach(this.posters, (poster) => {
            var form = _.find(this.forms, {posterId: poster.posterId})
            if(form) {
                poster.isScored = true;
            } else {
                poster.isScored = false;
            }
        });
    }

}

JudgeDashboardController.$inject = ['$scope', '$state', '$stateParams', 'posters', 'forms'];
app.controller('judgeDashboardController', JudgeDashboardController);