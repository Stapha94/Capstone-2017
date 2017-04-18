class InstitutionService extends BaseApiService {

    static serviceFactory($injector) {
        InstitutionService.instance = new InstitutionService($injector);
        return InstitutionService.instance;
    }

    constructor($injector) {
        super($injector, 'institutions', 'institution');
    }

    delete(object) {
        super.update(object);
    }

}

InstitutionService.$inject = ['$injector'];
app.factory('institutionService', InstitutionService);