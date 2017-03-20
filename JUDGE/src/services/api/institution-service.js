class InstitutionService extends BaseApiService {
    constructor($injector) {
        super($injector, 'institutions', 'institution');
    }

}

InstitutionService.$inject = ['$injector'];
app.factory('institutionService', InstitutionService);