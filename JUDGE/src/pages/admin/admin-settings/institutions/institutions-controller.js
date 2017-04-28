class InstitutionsController {

    static resolve() {
        return {
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get()
                        .then((data) => {
                            return data;
                        })
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(institutionService, institutions, judgeCategories) {
        this.institutionService = institutionService;
        this.institutions = institutions;
        this.judgeCategories = judgeCategories;
        this.institution = {judgeCategoryId: '', active: '1'};
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    add() {
        this.institutionService.create(this.institution)
            .then((institution) => {
                angular.element('.modal').modal('close');
                this.setModal();
                _.forEach(this.judgeCategories, (judgeCategory) => {
                    if(judgeCategory.judgeCategoryId === institution.judgeCategoryId) {
                        institution.category = judgeCategory.title;
                    }
                });
                this.institutions.push(institution);
                this.institution = {judgeCategory: '', active: '1'};
            });
    }

    edit() {
        this.institutionService.update(this.institution)
            .then(() => {
                angular.element('.modal').modal('close');
                this.setModal();
                _.forEach(this.judgeCategories, (judgeCategory) => {
                    if(judgeCategory.judgeCategoryId === this.institution.judgeCategoryId) {
                        this.institution.category = judgeCategory.title;
                    }
                });
                this.institution = {judgeCategoryId: '', active: '1'};
            });

    }

    cancel() {
        this.institution = {active: '1'};
        this.setModal();
        this.canEdit = false;
    }

    activate(institution) {
        institution.active = '1';
        this.institutionService.update(institution);
    }

    deactivate(institution) {
        institution.active = '0';
        this.institutionService.update(institution);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

    setEdit(institution) {
        this.canEdit = true;
        this.original = institution;
        this.institution = angular.copy(this.original);
    }

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

InstitutionsController.$inject = ['institutionService', 'institutions', 'judgeCategories'];
app.controller('institutionsController', InstitutionsController);