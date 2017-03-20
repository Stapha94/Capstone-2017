class FormService extends BaseApiService {
    constructor($injector) {
        super($injector, 'forms', 'form');
    }

}

FormService.$inject = ['$injector'];
app.factory('formService', FormService);