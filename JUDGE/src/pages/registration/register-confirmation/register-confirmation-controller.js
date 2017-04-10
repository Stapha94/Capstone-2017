class RegisterConfirmationController{

    constructor($scope, $state, presenterService, notificationService, localStorageService, registrationService, authService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.authService = authService;
        this.$state = $state;
        this.presenterCode = "";

    }

    validateCode() {

        if (this.presenterCode !== "") {
            this.continue();
        }
        else {
            this.notificationService.error("Please enter the code you received in your email!");
        }


    };

    continue() {
        this.$state.go('register-institution');

    };

}

RegisterConfirmationController.$inject = ['$scope', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService', 'authService'];
app.controller('registerConfirmationController', RegisterConfirmationController);