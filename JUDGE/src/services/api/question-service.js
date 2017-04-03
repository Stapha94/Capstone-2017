class QuestionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'questions', 'question');
    }

    delete(object) {
        super.update(object);
    }

}

QuestionService.$inject = ['$injector'];
app.factory('questionService', QuestionService);