class FormQuestionService extends BaseApiService {

    static serviceFactory($injector) {
        FormQuestionService.instance = new FormQuestionService($injector);
        return FormQuestionService.instance;
    }

    constructor($injector) {
        super($injector, 'form_questions', 'formQuestion');
    }

}

FormQuestionService.$inject = ['$injector'];
app.factory('formQuestionService', FormQuestionService.serviceFactory);