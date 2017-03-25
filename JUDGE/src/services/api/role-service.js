class RoleService extends BaseApiService {
    constructor($injector) {
        super($injector, 'roles', 'role');
    }

    delete(object) {
        super.update(object);
    }

}

RoleService.$inject = ['$injector'];
app.factory('roleService', RoleService);