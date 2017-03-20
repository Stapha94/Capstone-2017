class JudgePosterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judge_posters', 'judgePoster');
    }

}

JudgePosterService.$inject = ['$injector'];
app.factory('judgePosterService', JudgePosterService);