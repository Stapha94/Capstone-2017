class JudgeService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judges', 'judge');
    }

}

JudgeService.$inject = ['$injector'];
app.factory('judgeService', JudgeService);