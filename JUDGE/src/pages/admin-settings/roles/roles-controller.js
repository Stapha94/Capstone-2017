class RolesController extends BaseSiteController {

    static resolve() {
        return {
                roles: ['roleService', (roleService) => {
                    return roleService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(roleService, roles) {
        super(roleService, roles);
    }

}

RolesController.$inject = ['roleService', 'roles'];
app.controller('rolesController', RolesController);