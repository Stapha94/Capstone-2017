class RolesController {

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
        this.roleService = roleService;
        this.roles = roles;
        this.role = {active: '1'};
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    add() {
        this.roleService.create(this.role)
            .then((role) => {
                angular.element('.modal').modal('close');
                this.setModal();
                this.roles.push(role);
                this.role = {active: '1'};
            });
    }

    edit() {
        this.roleService.update(this.role)
            .then((role) => {
                angular.element('.modal').modal('close');
                this.setModal();
                this.role = {active: '1'};
            });

    }

    cancel() {
        this.role = {active: '1'};
        this.setModal();
        this.canEdit = false;
    }

    activate(role) {
        role.active = '1';
        this.roleService.update(role);
    }

    deactivate(role) {
        role.active = '0';
        this.roleService.update(role);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

    setEdit(role) {
        this.canEdit = true;
        this.original = role;
        this.role = angular.copy(this.original);
    }

    edit() {
        this.roleService.update(this.role)
            .then(() => {
                angular.element('.modal').modal('close');
                this.setEditModal();
                this.role = { active: '1' };
            })
    }

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

RolesController.$inject = ['roleService', 'roles'];
app.controller('rolesController', RolesController);