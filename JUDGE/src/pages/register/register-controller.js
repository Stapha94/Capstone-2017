class RegisterController {

    constructor($scope, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.emailVerified = false;
        this.presenterFirstName = "";
        this.presenterLastName = "";
        this.presenterEmail = "";
        this.presenterEmailConfirmation = "";

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered both a first and/or a last name
    verifyName() {

        if(this.presenterFirstName !== "" || this.presenterLastName !== ""){

            this.nameVerified = true;

        }
        else{

            this.nameVerified = false;
            this.notificationService.error("First Name and Last Name are required!");

        }
        this.verifyEmail();

    }

    //Makes sure that the registrant entered the same email for both email fields
    verifyEmail() {

        if(this.presenterEmail === this.presenterEmailConfirmation) {

            this.emailVerified = true;

        }
        else{

            this.verified = false;
            this.notificationService.error("Email and Email Confirmation must match!");

        }

    };

    continue() {

        if(this.emailVerified === true){

            registrationService.presenterFirstName = this.presenterFirstName;

        }


    }



}

RegisterController.$inject = ['$scope', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerController', RegisterController);