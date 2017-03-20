class AwardService extends BaseApiService {
    constructor($injector) {
        super($injector, 'awards', 'award');
    }

}

AwardService.$inject = ['$injector'];
app.factory('awardService', AwardService);