class AdminRegisterController {

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

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService, institutions, roles, summit) {
        this.notificationService = notificationService;
        if(summit === undefined) {
            this.notificationService.error("No Summit exists to add presenter!");
            $state.go('home.landing');
        }
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.institutions = institutions;
        this.roles = roles;
        this.$state = $state;
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
            this.continue();
        }
        else {
            this.notificationService.error("Please choose a role!");
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
        this.$state.go("home.admin.register-institution", {valid: true});

    }



}

AdminRegisterController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'institutions', 'roles', 'summit'];
app.controller('adminRegisterController', AdminRegisterController);