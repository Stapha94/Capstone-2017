class JudgeDashboardController {

    static resolve() {
        return {
                forms: ['formService', '$stateParams', 'localStorageService', (formService, $stateParams, localStorageService) => {
                    return formService.get({judgeId: $stateParams.judgeId, summitId: localStorageService.get('summit').summitId, active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
                awards: ['awardService', (awardService) => {
                    return awardService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, $state, $stateParams, forms, awards) {
        this.active = $stateParams.tab;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.forms = forms;
        this.awards = awards;
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

    downloadAbstract(poster) {
        var name = poster.posterTitle+'.pdf';
        var abstractDoc = {
            header: function(currentPage, pageCount) { 
                return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: [2, 2, 5, 0]}; 
            },
            background: { },
            content: [
                { text: poster.posterTitle, style: 'header', alignment: 'center'},
                { text: 'Objective', style: 'subheader'},
                poster.objective,
                { text: 'Methods', style: 'subheader'},
                poster.methods,
                { text: 'Results', style: 'subheader'},
                poster.results,
                { text: 'Conclusion', style: 'subheader'},
                poster.conclusion
            ],

            styles: {
                header: {
                    fontSize: 28,
                    bold: true,
                    margin: [0, 10]
                },
                subheader: {
                    fontSize: 22,
                    bold: true,
                    margin: [0,25,0,5]
                }
            }
        };
        pdfMake.createPdf(abstractDoc).download(name);
    }

}

JudgeDashboardController.$inject = ['$scope', '$state', '$stateParams', 'forms', 'awards'];
app.controller('judgeDashboardController', JudgeDashboardController);