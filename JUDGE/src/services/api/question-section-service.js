class QuestionSectionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'question_sections', 'question section');
    }

}

QuestionSectionService.$inject = ['$injector'];
app.factory('questionSectionService', QuestionSectionService);