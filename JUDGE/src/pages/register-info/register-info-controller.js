class RegisterInfoController{

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";
        this.validated = false;

    }

    validate() {
        if (this.projectTitle !== "" && this.projectObjective !== "" && this.projectMethods !== "" && this.projectResults !== "" && this.projectConclusion !== "") {
            this.validated = true;

        }
        else {
            this.validated = false;
            this.notificationService.error("You must enter all fields!");

        }
        this.finish();

    };

    finish() {
        if (this.validated === true) {
            this.registrationService.projectTitle = this.projectTitle;
            this.registrationService.projectObjective = this.projectObjective;
            this.registrationService.projectMethods = this.projectMethods;
            this.registrationService.projectResults = this.projectResults;
            this.registrationService.projectConclusion = this.projectConclusion;
            this.$state.go('home');
            this.notificationService.success("Thank you for registering!");

        }

    }

}

RegisterInfoController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerInfoController', RegisterInfoController);