class RegisterConfirmationController{

    constructor($scope, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.presenterCode = "";

    }

    validateCode() {



    }

}

RegisterConfirmationController.$inject = ['$scope', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerConfirmationController', RegisterConfirmationController);