class JudgeCategoryService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judge_categories', 'judgeCategory');
    }

}

JudgeCategoryService.$inject = ['$injector'];
app.factory('judgeCategoryService', JudgeCategoryService);