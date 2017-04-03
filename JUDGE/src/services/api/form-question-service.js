class FormQuestionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'form_questions', 'formQuestion');
    }

}

FormQuestionService.$inject = ['$injector'];
app.factory('formQuestionService', FormQuestionService);