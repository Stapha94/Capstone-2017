class SummitsController {

    static resolve() {
        return {
                summits: ['summitService', (summitService) => {
                    return summitService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, summits) {
        this.summits = summits;
    }

}

SummitsController.$inject = ['$scope', 'summits'];
app.controller('summitsController', SummitsController);