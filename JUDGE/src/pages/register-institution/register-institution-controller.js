class RegisterInstitutionController{

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService, institutions, roles) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.keyParticipantFName = "";
        this.keyParticipantLName = "";
        this.keyParticipantDepartment = "";
        this.keyParticipantInstitution = "";
        this.keyParticipantRole = "";
        this.institutions = institutions;
        this.roles = roles;
        this.keyParticipants = [];
        this.keyParticipant = {};
        this.institutionExists = false;
        this.roleExists = false;
        this.keyParticipantFNameExists = false;
        this.keyParticipantLNameExists = false;
        this.keyParticipantDepartmentExists = false;
        this.keyParticipantInstitutionExists = false;
        this.keyParticipantRoleExists = false;

    }

    //Checks to see if the user chose an institution
    checkInstitutionExists() {
        if(this.presenterInstitution !== null) {
            this.institutionExists = true;
            this.checkRoleExists();
        }
        else {
            this.notificationService.error("Please choose an institution!");
        }
    };

    //Checks to see if the user chose a role
    checkRoleExists() {
        if(this.presenterRole !== null) {
            this.roleExists = true;
            this.continue();
        }
        else {
            this.notificationService.error("Please choose a role!");
        }
    };

    //Checks to see if the user entered a first name for the key participant
    checkKeyParticipantFNameExists() {
        if(this.keyParticipantFName !== "") {
            this.keyParticipantFNameExists = true;
            this.checkKeyParticipantLNameExists();
        }
        else {
            this.notificationService.error("Please enter a first name!");
        }
    };

    //Checks to see if the user entered a last name for the key participant
    checkKeyParticipantLNameExists() {
        if(this.keyParticipantLName !== "") {
            this.keyParticipantLNameExists = true;
            this.checkKeyParticipantInstitutionExists();
        }
        else {
            this.notificationService.error("Please enter a last name!");
        }
    };

    //Checks to see if the user chose an institution for the key participant
    checkKeyParticipantInstitutionExists() {
        if(this.keyParticipantInstitution !== "") {
            this.keyParticipantInstitutionExists = true;
            this.checkKeyParticipantDepartmentExists();
        }
        else {
            this.notificationService.error("Please choose an institution");
        }
    };

    //Checks to see if the user chose/entered a department for the key participant.  This is only needed for the School of Medicine and Cabell Huntington
    checkKeyParticipantDepartmentExists() {
        if(this.keyParticipantInstitution === "MUSOM" || this.keyParticipantInstitution === "CHH") {
            if(this.keyParticipantDepartment !== "") {
                this.keyParticipantDepartmentExists = true;
                this.checkKeyParticipantRoleExists();
            }
            else {
                this.notificationService.error("Please enter/choose a department!");
            }
            this.keyParticipantDepartmentExists = true;
            this.checkKeyParticipantRoleExists();
        }
    };

    //Checks to see if the user chose a role for the key participant
    checkKeyParticipantRoleExists() {
        if(this.keyParticipantRole !== "") {
            this.keyParticipantRoleExists == true;
            this.addKeyParticipant();
        }
        else {
            this.notificationService.error("Please choose a role!");
        }
    };

    //Adds the entered key participant to the array
    addKeyParticipant() {
        this.keyParticipant = {
            keyParticipantFName: this.keyParticipantFName,
            keyParticipantLName: this.keyParticipantLName,
            keyParticipantDepartment: this.keyParticipantDepartment,
            keyParticipantInstitution: this.keyParticipantInstitution,
            keyParticipantRole: this.keyParticipantRole
        };
        this.keyParticipants.push(this.keyParticipant);
    };

    //Puts all of the information in the Registration Service and goes to the next page
    continue() {
        if(this.roleExists === true) {
            this.registrationService.presenterInstitution = this.presenterInstitution;
            this.registrationService.presenterRole = this.presenterRole;
            this.registrationService.keyParticipants = angular.copy(this.keyParticipants);
            this.$state.go('register-info');
        }
        else {
            this.notificationService.error("Please choose a role!");
        }


    };

    //Closes the modal
    close() {
        var modal = 
    }



}

RegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);