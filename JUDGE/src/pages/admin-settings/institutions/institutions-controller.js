class InstitutionsController extends BaseSiteController {

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

    constructor(institutionService, institutions) {
        super(institutionService, institutions);
    }

}

InstitutionsController.$inject = ['institutionService', 'institutions'];
app.controller('institutionsController', InstitutionsController);