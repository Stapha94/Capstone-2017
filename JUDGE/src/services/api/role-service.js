class RoleService extends BaseApiService {
    constructor($injector) {
        super($injector, 'roles', 'role');
    }

}

RoleService.$inject = ['$injector'];
app.factory('roleService', RoleService);