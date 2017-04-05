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

    }

    //Checks to see if the user chose an institution
    checkInstitutionExists() {
        if(this.presenterInstitution !== null) {
            this.checkRoleExists();
        }
        else {
            this.notificationService.error("Please choose an institution!");
        }
    };

    //Checks to see if the user chose a role
    checkRoleExists() {
        if(this.presenterRole !== null) {
            this.continue();
        }
        else {
            this.notificationService.error("Please choose a role!");
        }
    };

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
        if(this.keyParticipantInstitution !== null) {
            this.checkKeyParticipantDepartmentExists();
        }
        else {
            this.notificationService.error("Please choose an institution");
        }
    };

    //Checks to see if the user chose/entered a department for the key participant.  This is only needed for the School of Medicine and Cabell Huntington
    checkKeyParticipantDepartmentExists() {
        if(this.keyParticipantInstitution === "1" || this.keyParticipantInstitution === "2") {
            if(this.keyParticipantDepartment !== "") {
                this.checkKeyParticipantRoleExists();
            }
            else {
                this.notificationService.error("Please enter/choose a department!");
            }
        }
        else {
            this.keyParticipantDepartment = "N/A";
            this.checkKeyParticipantRoleExists();
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
        this.keyParticipants.push(this.keyParticipant);
        this.close();
    };

    //Puts all of the information in the Registration Service and goes to the next page
    continue() {

        this.registrationService.presenterInstitution = this.presenterInstitution;
        this.registrationService.presenterRole = this.presenterRole;
        this.registrationService.keyParticipants = angular.copy(this.keyParticipants);
        this.$state.go('register-info');

    };

    //Closes the modal
    close() {
        angular.element(document.querySelector("#modal1")).modal('close');
    }



}

RegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);