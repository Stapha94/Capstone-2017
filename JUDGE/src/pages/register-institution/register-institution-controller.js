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

    continue() {
        this.registrationService.presenterInstitution = this.presenterInstitution;
        this.registrationService.presenterRole = this.presenterRole;
        this.registrationService.keyParticipants = this.keyParticipants.slice();
        this.$state.go('register-info');


    };



}

RegisterInstitutionController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles'];
app.controller('registerInstitutionController', RegisterInstitutionController);