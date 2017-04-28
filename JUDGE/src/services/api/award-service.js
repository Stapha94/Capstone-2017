class AwardService extends BaseApiService {

    static serviceFactory($injector) {
        AwardService.instance = new AwardService($injector);
        return AwardService.instance;
    }

    constructor($injector) {
        super($injector, 'awards', 'award');
    }

    delete(object) {
        super.update(object);
    }

}

AwardService.$inject = ['$injector'];
app.factory('awardService', AwardService.serviceFactory);