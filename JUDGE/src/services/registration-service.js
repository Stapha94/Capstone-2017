class registrationService {
    constructor($log, $filter, $http, presenterService, posterCategoryService, keyParticipantService, posterAbstractService, posterService) {
        this.presenterFirstName = "";
        this.presenterLastName = "";
        this.presenterSuffix = "";
        this.presenterEmail = "";
        this.presenterInstitution = "";
        this.presenterRole = "";
        this.keyParticipants = [];
        this.projectTitle = "";
        this.projectObjective = "";
        this.projectMethods = "";
        this.projectResults = "";
        this.projectConclusion = "";
        this.summitId = 0;
        this.posterCategoryId = 0;
        this.presenter = {};
        this.posterAbstract = {};
        this.poster = {};
        this.$http = $http;
        this.$log = $log;
        this.presenterService = presenterService;
        this.posterCategoryService = posterCategoryService;
        this.keyParticipantService = keyParticipantService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;

    }

    makePresenter() {
        this.presenter = {
            firstName: this.presenterFirstName,
            lastName: this.presenterLastName,
            suffix: this.presenterSuffix,
            email: this.presenterEmail,
            institutionId: this.presenterInstitution,
            roleId: this.presenterRole
        };
        return this.presenter;

    }

    makePosterAbstract() {
        this.posterAbstract = {
            title: this.projectTitle,
            objective: this.projectObjective,
            methods: this.projectMethods,
            results: this.projectResults,
            conclusion: this.projectConclusion
        };
        return this.posterAbstract;
    }

    create() {
        this.presenterService.create(this.presenter)
            .then((presenter) => {
                _.forEach(this.keyParticipants, (keyParticipant) => {
                    keyParticipant.presenterId = presenter.presenterId;
                    this.keyParticipantService.create(keyParticipant);
                });
                this.posterAbstractService.create(this.posterAbstract)
                .then((posterAbstract) => {
                    this.poster.presenterId = presenter.presenterId; 
                    this.poster.posterAbstractId = posterAbstract.posterAbstractId;
                    this.poster.submissionDate = new Date();
                    this.posterService.create(this.poster)
                });

            });
    };

    email() {
        this.$http.post(/**URL HERE, (OBJECT HERE)*/)
    }
}

registrationService.$inject = ['$log', '$filter', '$http', 'presenterService', 'posterCategoryService', 'keyParticipantService', 'posterAbstractService', 'posterService'];
app.service('registrationService', registrationService);
