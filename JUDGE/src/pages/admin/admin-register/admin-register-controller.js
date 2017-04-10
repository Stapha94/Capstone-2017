class AdminRegisterController {

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.suffix = "";
        this.emailConfirmation = "";
        this.presenter = {};
        this.$scope = $scope;

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered the same email for both email fields
    verifyEmail() {
        if(this.email === this.emailConfirmation) {
            this.continue();
        }
        else{
            this.notificationService.error("Email and Email Confirmation must match!");

        }

    };

    //Loads the data in the custom service and will move to the next page
    continue() {

        this.presenter = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            suffix: this.suffix,
            institutionId: 0,
            roleId: 0
        };

        this.registrationService.presenter = this.presenter;

        this.registrationService.presenterFirstName = this.presenterFirstName;
        this.registrationService.presenterLastName = this.presenterLastName;
        this.registrationService.presenterEmail = this.presenterEmail;
        this.$state.go("home.admin.register-institution", {valid: true});

    };



}

AdminRegisterController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('adminRegisterController', AdminRegisterController);