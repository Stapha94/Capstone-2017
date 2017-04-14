class AdminParticipantsController {

    static resolve() {
        return {
            summits: ['summitService', (summitService) => {
                return summitService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            presenters: ['presenterService', (presenterService) => {
                return presenterService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            abstracts: ['posterAbstractService', (posterAbstractService) => {
                return posterAbstractService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            posters: ['posterService', (posterService) => {
                return posterService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            keyParticipants: ['keyParticipantService', (keyParticipantService) => {
                return keyParticipantService.get()
                    .then((data) => {
                        return data;
                    })
            }]
        }
    }

    constructor($scope, $state, NgTableParams, presenterService, posterAbstractService, posterService, keyParticipantService, summits, presenters, abstracts, posters, keyParticipants, notificationService) {
        this.presenterService = presenterService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;
        this.keyParticipantService = keyParticipantService;
        this.notificationService = notificationService;
        this.summits = summits;
        this.summitId = summits[0].summitId;
        this.presenters = presenters;
        this.abstracts = abstracts;
        this.posters = posters;
        this.keyParticipants = keyParticipants;
        this.presenterAbstract = {};
        this.presenter = {};
        this.editedKeyParticipants = [];
        this.posterAbstract = {};
        this.poster = {};
        this.NgTableParams = NgTableParams;
        this.tableActiveParams = this.loadTableParams('1');
        this.tableInactiveParams = this.loadTableParams('0');
        $scope.$watch(() => {return this.summitId}, (newVal, oldVal) => {
            this.tableActiveParams.filter({active: '1', summitId: newVal} );
            this.tableActiveParams.reload();
            this.tableInactiveParams.filter({active: '0', summitId: newVal} );
            this.tableInactiveParams.reload();
        })
    }

    loadTableParams(active) {
        var params = {
            count: 2,
            filter: { active: active,  summitId: this.summitId }
        }
        var settings = {
            counts: [],
            paginationMaxBlocks: 13,
            paginationMinBlocks: 1,
            dataset: this.presenters
        };
        return new this.NgTableParams(params, settings);
    }

    getKeyParticipants(presenter) {
        this.presenterKeyParticipants = _.filter(this.keyParticipants, {presenterId: presenter.presenterId});
    }

    getPoster(presenter) {
        this.presenterPoster = _.find(this.posters, {presenterId: presenter.presenterId});
        this.presenterAbstract = _.find(this.abstracts, {posterAbstractId: this.presenterPoster.posterAbstractId});
    }

    activate(presenter) {
        presenter.active = '1';
        this.tableActiveParams.settings({dataset: this.presenters});
        this.tableActiveParams.reload();
        this.tableInactiveParams.settings({dataset: this.presenters});
        this.tableInactiveParams.reload();
        this.presenterService.update(presenter);
    }

    deactivate(presenter) {
        presenter.active = '0';
        this.tableActiveParams.settings({dataset: this.presenters});
        this.tableActiveParams.reload();
        this.tableInactiveParams.settings({dataset: this.presenters});
        this.tableInactiveParams.reload();
        this.presenterService.update(presenter);
    }


}

AdminParticipantsController.$inject = ['$scope', '$state', 'NgTableParams', 'presenterService', 'posterAbstractService', 'posterService', 'keyParticipantService', 'summits', 'presenters', 'abstracts', 'posters', 'keyParticipants', 'notificationService'];
app.controller('adminParticipantsController',  AdminParticipantsController);

