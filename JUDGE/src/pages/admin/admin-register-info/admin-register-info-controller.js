class AdminRegisterInfoController {

    constructor($scope, $timeout, $state, presenterService, notificationService, localStorageService, registrationService) {
        this.notificationService = notificationService;
        this.presenterService = presenterService;
        this.localStorageService = localStorageService;
        this.registrationService = registrationService;
        this.$timeout = $timeout;
        this.$state = $state;
        this.posterAbstract = {};
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";

    }


    finish() {

        this.posterAbstract = {
            title: this.projectTitle,
            objective: this.projectObjective,
            methods: this.projectMethods,
            results: this.projectResults,
            conclusion: this.projectConclusion
        };

        this.registrationService.posterAbstract = this.posterAbstract;
        this.registrationService.projectTitle = this.projectTitle;
        this.registrationService.projectObjective = this.projectObjective;
        this.registrationService.projectMethods = this.projectMethods;
        this.registrationService.projectResults = this.projectResults;
        this.registrationService.projectConclusion = this.projectConclusion;
        this.registrationService.summitId = this.summitId;
        this.registrationService.create()
            .then(() => {
                this.$state.go('home.admin.presenters');
                this.notificationService.success("Thank you for registering!");
            })
            .catch(() => {
                this.notificationService.error('Something went wrong! Please try again later!');
            });


    }

}

AdminRegisterInfoController.$inject = ['$scope', '$timeout', '$state', 'presenterService', 'notificationService', 'localStorageService', 'registrationService'];
app.controller('adminRegisterInfoController', AdminRegisterInfoController);