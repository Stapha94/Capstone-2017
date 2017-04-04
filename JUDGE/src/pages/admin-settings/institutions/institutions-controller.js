class InstitutionsController {

    static resolve() {
        return {
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, institutions) {
        this.institutions = institutions;
    }

}

InstitutionsController.$inject = ['$scope', 'institutions'];
app.controller('institutionsController', InstitutionsController);