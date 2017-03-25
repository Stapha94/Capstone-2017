class AwardService extends BaseApiService {
    constructor($injector) {
        super($injector, 'awards', 'award');
    }

    delete(object) {
        super.update(object);
    }

}

AwardService.$inject = ['$injector'];
app.factory('awardService', AwardService);