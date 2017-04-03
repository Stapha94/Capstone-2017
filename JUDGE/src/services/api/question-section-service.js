class QuestionSectionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'question_sections', 'question section');
    }

    delete(object) {
        super.update(object);
    }

}

QuestionSectionService.$inject = ['$injector'];
app.factory('questionSectionService', QuestionSectionService);