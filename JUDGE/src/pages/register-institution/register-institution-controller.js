class RegisterInstitutionController{

    constructor($scope, presenterService, notificationService, localStorageService, registrationService, institutions, roles) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
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

    addKeyParticipant() {
        this.keyParticipant = {
            keyParticipantFName: this.keyParticipantFName,
            keyParticipantLName: this.keyParticipantLName,
            keyParticipantDepartment: this.keyParticipantDepartment,
            keyParticipantInstitution: this.keyParticipantInstitution,
            keyParticipantRole: this.keyParticipantRole
        };
        this.keyParticipants.push(this.keyParticipant);
    }



}

RegisterInstitutionController.$inject = ['$scope', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);