class RegisterInfoController{

    constructor($scope, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;

    }

}

RegisterInfoController.$inject = ['$scope', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('registerInfoController', RegisterInfoController);