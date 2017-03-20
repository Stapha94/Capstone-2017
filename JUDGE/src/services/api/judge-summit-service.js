class JudgeSummitService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judge_summits', 'judgeSummit');
    }

}

JudgeSummitService.$inject = ['$injector'];
app.factory('judgeSummitService', JudgeSummitService);