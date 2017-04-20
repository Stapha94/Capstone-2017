class QuestionSectionService extends BaseApiService {

    static serviceFactory($injector) {
        QuestionSectionService.instance = new QuestionSectionService($injector);
        return QuestionSectionService.instance;
    }

    constructor($injector) {
        super($injector, 'question_sections', 'question section');
    }

    delete(object) {
        super.update(object);
    }

}

QuestionSectionService.$inject = ['$injector'];
app.factory('questionSectionService', QuestionSectionService.serviceFactory);