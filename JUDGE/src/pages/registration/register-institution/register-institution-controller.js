class RegisterInstitutionController{

    static resolve() {
        return {
            institutions: ['institutionService', (institutionService) => {
                return institutionService.get({active: 1 })
                    .then((data) => {
                        return data;
                    });
            }],
            roles: ['roleService', (roleService) => {
                return roleService.get({active: 1 })
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService, institutions, roles) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.summitId = localStorageService.get("summit").summitId;
        this.posterCategoryId = "";
        this.keyParticipantFName = "";
        this.keyParticipantLName = "";
        this.keyParticipantDepartment = "";
        this.keyParticipantInstitution = "";
        this.keyParticipantRole = "";
        this.institutions = institutions;
        this.roles = roles;
        this.keyParticipants = [];
        this.keyParticipant = {};
        this.musomDepartments = ["Family Medicine", "MED/PEDS", "Surgery", "Orthopaedics", "OBGYN", "Psychiatry", "Neurology", "Pediatrics", "Cardiology", "Endocrinology", "Hematology/Oncology", "Nephrology", "Pulmonary", "Sports Medicine"];

    }

    //Checks to see if the user entered a first name for the key participant
    checkKeyParticipantFNameExists() {
        if(this.keyParticipantFName !== "") {
            this.checkKeyParticipantLNameExists();
        }
        else {
            this.notificationService.error("Please enter a first name!");
        }
    };

    //Checks to see if the user entered a last name for the key participant
    checkKeyParticipantLNameExists() {
        if(this.keyParticipantLName !== "") {
            this.checkKeyParticipantInstitutionExists();
        }
        else {
            this.notificationService.error("Please enter a last name!");
        }
    };

    //Checks to see if the user chose an institution for the key participant
    checkKeyParticipantInstitutionExists() {
        if(this.keyParticipantInstitution !== null && this.keyParticipantInstitution !== "") {
            this.checkKeyParticipantDepartmentExists();
        }
        else {
            this.notificationService.error("Please choose an institution");
        }
    };

    //Checks to see if the user chose/entered a department for the key participant.  This is only needed for the School of Medicine and Cabell Huntington
    checkKeyParticipantDepartmentExists() {
        if(this.keyParticipantDepartment !== null && this.keyParticipantDepartment !== "") {
            this.checkKeyParticipantRoleExists();
        }
        else {
            this.notificationService.error("Please enter/choose a department!");
        }
    };

    //Checks to see if the user chose a role for the key participant
    checkKeyParticipantRoleExists() {
        if(this.keyParticipantRole !== null) {
            this.addKeyParticipant();
        }
        else {
            this.notificationService.error("Please choose a role!");
        }
    };

    //Adds the entered key participant to the array
    addKeyParticipant() {
        this.keyParticipant = {
            firstName: this.keyParticipantFName,
            lastName: this.keyParticipantLName,
            department: this.keyParticipantDepartment,
            institutionId: this.keyParticipantInstitution,
            roleId: this.keyParticipantRole
        };
        _.forEach(this.institutions, (institution) => {
            if(institution.institutionId === this.keyParticipant.institutionId) {
                this.keyParticipant.institution = institution.title;
            }
        });
        _.forEach(this.roles, (role) => {
            if(role.roleId === this.keyParticipant.roleId) {
                this.keyParticipant.role = role.title;
            }
        });
        this.keyParticipants.push(this.keyParticipant);
        this.close();
    };

    //Puts all of the information in the Registration Service and goes to the next page
    continue() {

        _.forEach(this.roles, (role) => {
            if(this.registrationService.presenter.roleId === role.roleId) {
                this.posterCategoryId = role.posterCategoryId;
            }
        });

        this.poster = {
            posterCategoryId: this.posterCategoryId,
            summitId: this.summitId,
            awardId: 1,
            posterAbstractId: 0,
            presenterId: 0
        };

        this.registrationService.poster = this.poster;
        this.registrationService.keyParticipants = angular.copy(this.keyParticipants);
        this.$state.go('register-info', {valid: true});

    };

    //Closes the modal
    close() {
        angular.element(document.querySelector("#modal1")).modal('close');
        this.keyParticipantFName = "";
        this.keyParticipantLName = "";
        this.keyParticipantDepartment = "";
        this.keyParticipantInstitution = "";
        this.keyParticipantRole = "";
        this.keyParticipant = {};
    };

    reset() {

    };

    delete(keyParticipant) {
        _.remove(this.keyParticipants, keyParticipant);
        this.notificationService.success("Key Participant Removed!");
    };



}

RegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);