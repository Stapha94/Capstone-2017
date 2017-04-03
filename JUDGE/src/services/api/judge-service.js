class JudgeService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judges', 'judge');
    }

    delete(object) {
        super.update(object);
    }

}

JudgeService.$inject = ['$injector'];
app.factory('judgeService', JudgeService);