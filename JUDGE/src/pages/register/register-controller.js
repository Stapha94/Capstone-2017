class RegisterController {

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$state = $state;
        this.emailVerified = false;
        this.nameVerified = false;
        this.emailExists = false
        this.presenterFirstName = "";
        this.presenterLastName = "";
        this.presenterEmail = "";
        this.presenterEmailConfirmation = "";

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered both a first and/or a last name
    verifyName() {

        if(this.presenterFirstName !== "" && this.presenterLastName !== ""){

            this.nameVerified = true;
            this.checkEmailExist();
        }
        else{

            this.nameVerified = false;
            this.notificationService.error("First Name and Last Name are required!");

        }


    };
    //Checks to see that the user has entered an email address in both fields
    checkEmailExist() {
        if(this.presenterEmail !== "" && this.presenterEmailConfirmation !== "") {
            this.emailExists = true;
            this.verifyEmail();
        }
        else {
            this.emailExists = false;
            this.notificationService.error("Email and Email Confirmation Must have a valid email address!");
        }
    };

    //Makes sure that the registrant entered the same email for both email fields
    verifyEmail() {
        if(this.presenterEmail === this.presenterEmailConfirmation) {
            this.emailVerified = true;
            this.continue();
        }
        else{
            this.verified = false;
            this.notificationService.error("Email and Email Confirmation must match!");

        }

    };

    //Loads the data in the custom service and will move to the next page
    continue() {
        if(this.emailVerified === true && this.nameVerified === true){
            this.registrationService.presenterFirstName = this.presenterFirstName;
            this.registrationService.presenterLastName = this.presenterLastName;
            this.registrationService.presenterEmail = this.presenterEmail;

            this.$state.go("register-confirmation");

        }

    };



}

RegisterController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerController', RegisterController);