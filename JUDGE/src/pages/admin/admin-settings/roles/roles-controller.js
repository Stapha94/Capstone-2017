class RolesController {

    static resolve() {
        return {
                roles: ['roleService', (roleService) => {
                    return roleService.get()
                        .then((data) => {
                            return data;
                        })
                }],
                posterCategories: ['posterCategoryService', (posterCategoryService) => {
                    return posterCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(roleService, roles, posterCategories) {
        this.roleService = roleService;
        this.roles = roles;
        this.posterCategories = posterCategories;
        this.role = {active: '1'};
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    add() {
        this.roleService.create(this.role)
            .then((role) => {
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                _.forEach(this.posterCategories, (posterCategory) => {
                    if(posterCategory.posterCategoryId === role.posterCategoryId) {
                        role.category = posterCategory.title;
                    }
                });
                this.roles.push(role);
                this.role = {active: '1'};
            });
    }

    edit() {
        var role = _.find(this.roles, {roleId: this.role.roleId});
        this.roleService.update(this.role)
            .then(() => {
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                _.forEach(this.posterCategories, (posterCategory) => {
                    if(posterCategory.posterCategoryId === role.posterCategoryId) {
                        role.category = posterCategory.title;
                    }
                });
                this.role = {active: '1'};
            });

    }

    // Resets the select fields.
    // Based on: http://stackoverflow.com/questions/37399188/jquery-materialize-changing-select-option-back-to-disabled-select-on-clear
    reset() {
        var selects = angular.element(document.querySelectorAll('select'));
        _.forEach(selects, (select) => {
            select = angular.element(select);
            select.val('None'); //Different approach here required for some reason
            select.material_select();
        })
    }

    cancel() {
        this.role = {active: '1'};
        this.reset();
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

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

RolesController.$inject = ['roleService', 'roles', 'posterCategories'];
app.controller('rolesController', RolesController);