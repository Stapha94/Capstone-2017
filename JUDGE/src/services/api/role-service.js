class RoleService extends BaseApiService {

    static serviceFactory($injector) {
        RoleService.instance = new RoleService($injector);
        return RoleService.instance;
    }

    constructor($injector) {
        super($injector, 'roles', 'role');
    }

    delete(object) {
        super.update(object);
    }

}

RoleService.$inject = ['$injector'];
app.factory('roleService', RoleService.serviceFactory);