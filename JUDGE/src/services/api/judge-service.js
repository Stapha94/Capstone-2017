class JudgeService extends BaseApiService {

    static serviceFactory($injector) {
        JudgeService.instance = new JudgeService($injector);
        return JudgeService.instance;
    }

    constructor($injector) {
        super($injector, 'judges', 'judge');
    }

    delete(object) {
        super.update(object);
    }

}

JudgeService.$inject = ['$injector'];
app.factory('judgeService', JudgeService.serviceFactory);