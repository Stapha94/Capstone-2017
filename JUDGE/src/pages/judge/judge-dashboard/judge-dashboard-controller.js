class JudgeDashboardController {

    static resolve() {
        return {
                forms: ['formService', '$stateParams', 'localStorageService', (formService, $stateParams, localStorageService) => {
                    return formService.get({judgeId: $stateParams.judgeId, summitId: localStorageService.get('summit').summitId, active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
            }
    }

    constructor($scope, $state, $stateParams, forms) {
        this.active = $stateParams.tab;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.forms = forms;
        this.abstract = {};
        this.tabs = [
            { id: 'Pending' },
            { id: 'Complete' }
        ];
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

}

JudgeDashboardController.$inject = ['$scope', '$state', '$stateParams', 'forms'];
app.controller('judgeDashboardController', JudgeDashboardController);