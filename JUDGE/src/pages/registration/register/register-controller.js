class RegisterController {

    static resolve() {
        return {
            summit: ['summitService', (summitService) => {
                return summitService.get({active: 1})
                    .then((data) => {
                        return data[0];
                    });
            }],
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

    constructor($scope, $state, summit, presenterService, notificationService, localStorageService, registrationService, reCaptchaService, institutions, roles) {
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
        this.institutions = institutions;
        this.roles = roles;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.suffix = "";
        this.emailConfirmation = "";
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.presenter = {};
        this.$scope = $scope;

        //Whatever for reCaptcha here
    }

    //Makes sure that the registrant entered the same email for both email fields
    verifyEmail() {
        if(this.email === this.emailConfirmation) {
            this.checkInstitutionExists();
        }
        else{
            this.notificationService.error("Email and Email Confirmation must match!");

        }

    };

    //Checks to see if the user chose an institution
    checkInstitutionExists() {
        if(this.presenterInstitution !== null && this.presenterInstitution !== "") {
            this.checkRoleExists();
        }
        else {
            this.notificationService.error("Please choose an institution!");
        }
    };

    //Checks to see if the user chose a role
    checkRoleExists() {
        if(this.presenterRole !== null && this.presenterRole !== "") {
            this.verifyRecaptcha();
        }
        else {
            this.notificationService.error("Please choose a role!");
        }
    };

    verifyRecaptcha() {
        this.grecaptchaResponse = grecaptcha.getResponse();
        if(this.grecaptchaResponse !== ""){
            this.reCaptchaService.send({grecaptchaResponse: this.grecaptchaResponse})
                .then(()  => {
                    this.continue();
                })
                .catch(() => {
                    grecaptcha.reset();
                    this.notificationService.error("Please complete the reCaptcha!");
                });
        }
        else{
            this.notificationService.error("Please complete the reCaptcha!");
        }

    };

    //Loads the data in the custom service and will move to the next page
    continue() {

        this.presenter = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            suffix: this.suffix,
            institutionId: this.presenterInstitution,
            roleId: this.presenterRole
        };

        this.registrationService.presenter = this.presenter;
        this.$state.go("register-institution", {valid: true});

    };



}

RegisterController.$inject = ['$scope', '$state', 'summit', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'reCaptchaService', 'institutions', 'roles'];
app.controller('registerController', RegisterController);