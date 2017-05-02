class AdminPresenterInfoController {

    static resolve() {
        return {
                presenter: ['presenterService', '$stateParams', (presenterService, $stateParams) => {
                    return presenterService.get({presenterId: $stateParams.presenterId})
                        .then((data) => {
                            return data[0];
                        });
                }],
                keyParticipants: ['keyParticipantService', 'presenter', (keyParticipantService, presenter) => {
                    return keyParticipantService.get({presenterId: presenter.presenterId})
                        .then((data) => {
                            return data;
                        })
                }],
                poster: ['posterService', 'presenter', (posterService, presenter) => {
                    return posterService.get({presenterId: presenter.presenterId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                posterAbstract: ['posterAbstractService', 'poster', (posterAbstractService, poster) => {
                    return posterAbstractService.get({posterId: poster.posterId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
                roles: ['roleService', (roleService) => {
                    return roleService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, presenterService, keyParticipantService, posterAbstractService, presenter, keyParticipants, posterAbstract, institutions, roles, notificationService) {
        this.$scope = $scope;
        this.presenterService = presenterService;
        this.keyParticipantService = keyParticipantService;
        this.posterAbstractService   = posterAbstractService;
        this.notificationService = notificationService;
        this.original = presenter;
        this.presenter = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.originalPosterAbstract = posterAbstract;
        this.posterAbstract = angular.copy(this.originalPosterAbstract);
        this.keyParticipants = keyParticipants;
        this.keyParticipant = {presenterId: this.presenter.presenterId};
        this.oldInstitution = '';
        this.institutions = institutions;
        this.roles = roles;
        this.canEdit = false;
        this.musomDepartments = ["Family Medicine", "MED/PEDS", "Surgery", "Orthopaedics", "OBGYN", "Psychiatry", "Neurology", "Pediatrics", "Cardiology", "Endocrinology", "Hematology/Oncology", "Nephrology", "Pulmonary", "Sports Medicine"];
    }

    edit() {
        this.canEdit = true;
    }

    // Resets the select fields.
    // Based on: http://stackoverflow.com/questions/37399188/jquery-materialize-changing-select-option-back-to-disabled-select-on-clear
    reset() {
        var selects = angular.element(document.querySelectorAll('select'));
        _.forEach(selects, (select) => {
            select = angular.element(select);
            //select.val('None'); //Different approach here required for some reason
            //select.material_select();
        })
    }

    // Resets the department when the institution is changed
    resetDepartment() {
        if(this.keyParticipant.institutionId === '1') {
            this.keyParticipant.department = "";
            var departmentSelect = angular.element('#keyParticipantDepartmentMUSOM');
            //departmentSelect.val('None');
            //departmentSelect.material_select();
            this.oldInstitution = this.keyParticipant.institutionId;
        } else {
            // Only reset it if changing from the dropwdown
            if(this.oldInstitution === '1') {
                this.keyParticipant.department = "";
                this.oldInstitution = this.keyParticipant.institutionId;
            }
        }
    }

    updatePresenter() {
        this.presenterService.update(this.presenter)
            .then((data) => {
                this.canEdit = false;
                this.original = angular.copy(this.presenter);
            })
            .catch((error) => {
                this.canEdit = false;
                this.presenter = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.presenter = angular.copy(this.original);
    }

    addKeyParticipant() {
        this.keyParticipantService.create(this.keyParticipant)
            .then((keyParticipant) => {
                this.keyParticipants.push(keyParticipant);
                this.keyParticipant = {presenterId: this.presenter.presenterId};
                this.reset();
            });
    }

    cancelKeyParticipant() {
        this.keyParticipant = {presenterId: this.presenter.presenterId};
        this.reset();
    }

    deleteKeyParticipant(keyParticipant) {
        this.keyParticipantService.delete(keyParticipant.keyParticipantId)
            .then(() => {
                _.remove(this.keyParticipants, keyParticipant);
            });
    }

    updatePosterAbstract() {
        this.posterAbstractService.update(this.posterAbstract)
            .then(() => {
                this.originalPosterAbstract = angular.copy(this.posterAbstract);
            });
    }

    cancelPosterAbstract() {
        this.posterAbstract = angular.copy(this.originalPosterAbstract);
    }

}

AdminPresenterInfoController.$inject = ['$scope', 'presenterService', 'keyParticipantService', 'posterAbstractService', 'presenter', 'keyParticipants', 'posterAbstract', 'institutions', 'roles', 'notificationService'];
app.controller('adminPresenterInfoController', AdminPresenterInfoController);