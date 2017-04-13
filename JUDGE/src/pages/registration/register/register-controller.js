class RegisterController {

    static resolve() {
        return {
            summit: ['summitService', (summitService) => {
                return summitService.get({active: 1})
                    .then((data) => {
                        return data[0];
                    });
            }]
        }
    }

    constructor($scope, $state, summit, presenterService, notificationService, localStorageService, registrationService, reCaptchaService) {
        if(summit === undefined) {
            $state.go('home.landing');
        }
        var deadline = new Date(summit.registrationDeadline).valueOf();
        var today = new Date().valueOf();
        if(deadline < today) {
            $state.go('home.landing');
        }
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.reCaptchaService = reCaptchaService;
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

    verifyRecaptcha() {
        this.grecaptchaResponse = grecaptcha.getResponse();
        this.reCaptchaService.send({grecaptchaResponse: this.grecaptchaResponse})
            .then(()  => {
            this.verifyEmail();
        })
            .catch(() => {
            grecaptcha.reset();
            this.notificationService.error("Please complete the reCaptcha!")
        });

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
        this.$state.go("register-institution", {valid: true});

    };



}

RegisterController.$inject = ['$scope', '$state', 'summit', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'reCaptchaService'];
app.controller('registerController', RegisterController);