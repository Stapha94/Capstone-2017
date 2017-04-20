class JudgeCategoryService extends BaseApiService {

    static serviceFactory($injector) {
        JudgeCategoryService.instance = new JudgeCategoryService($injector);
        return JudgeCategoryService.instance;
    }

    constructor($injector) {
        super($injector, 'judge_categories', 'judgeCategory');
    }

    delete(object) {
        super.update(object);
    }

}

JudgeCategoryService.$inject = ['$injector'];
app.factory('judgeCategoryService', JudgeCategoryService.serviceFactory);