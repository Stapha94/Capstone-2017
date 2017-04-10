class AwardsController extends BaseSiteController {

    static resolve() {
        return {
                awards: ['awardService', (awardService) => {
                    return awardService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(awardService, awards) {
        super(awardService, awards);
    }

}

AwardsController.$inject = ['awardService', 'awards'];
app.controller('awardsController', AwardsController);