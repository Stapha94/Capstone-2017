class JudgeCategoryService extends BaseApiService {
    constructor($injector) {
        super($injector, 'judge_categories', 'judgeCategory');
    }

    delete(object) {
        super.update(object);
    }

}

JudgeCategoryService.$inject = ['$injector'];
app.factory('judgeCategoryService', JudgeCategoryService);