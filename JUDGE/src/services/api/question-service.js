class QuestionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'questions', 'question');
    }

}

QuestionService.$inject = ['$injector'];
app.factory('questionService', QuestionService);