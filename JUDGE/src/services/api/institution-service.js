class InstitutionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'institutions', 'institution');
    }

    delete(object) {
        super.update(object);
    }

}

InstitutionService.$inject = ['$injector'];
app.factory('institutionService', InstitutionService);