class QuestionService extends BaseApiService {

    static serviceFactory($injector) {
        QuestionService.instance = new QuestionService($injector);
        return QuestionService.instance;
    }

    constructor($injector) {
        super($injector, 'questions', 'question');
    }

    delete(object) {
        super.update(object);
    }

}

QuestionService.$inject = ['$injector'];
app.factory('questionService', QuestionService.serviceFactory);