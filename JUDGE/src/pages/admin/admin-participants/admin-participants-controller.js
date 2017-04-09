class AdminParticipantsController {

    static resolve() {
        return {
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

    constructor($scope, $state, presenterService, posterAbstractService, posterService, keyParticipantService, presenters, abstracts, posters, keyParticipants, notificationService) {
        this.presenterService = presenterService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;
        this.keyParticipantService = keyParticipantService;
        this.notificationService = notificationService;
        this.presenters = presenters;
        this.abstracts = abstracts;
        this.posters = posters;
        this.keyParticipants = keyParticipants;
        this.presenterAbstract = {};
        this.presenter = {};
        this.editedKeyParticipants = [];
        this.posterAbstract = {};
        this.poster = {};
    }

    getKeyParticipants(presenter) {
        this.presenterKeyParticipants = _.filter(this.keyParticipants, {presenterId: presenter.presenterId});
    }

    getPoster(presenter) {
        this.presenterPoster = _.find(this.posters, {presenterId: presenter.presenterId});
        this.presenterAbstract = _.find(this.abstracts, {posterAbstractId: this.presenterPoster.posterAbstractId});
    }

    submit() {
        this.presenterService.create(this.presenter)
            .then((presenter) => {
                _.forEach(this.keyParticipants, (keyParticipant) => {
                    keyParticipant.presenterId = presenter.presenterId;
                    this.keyParticipantService.create(this.keyParticipant)
                });
                this.posterAbstractService.create(this.posterAbstract)
                    .then((posterAbstract) => {
                        this.poster.presenterId = presenter.presenterId;
                        this.poster.abstractId = posterAbstract.posterAbstractId;
                        this.poster.submissionDate = new Date();
                        this.posterService.create(this.poster);
                });
            });
    }

    goToKeyParticipants() {
        if(this.presenter.email !== this.presenter.emailConfirm) {
            this.notificationService.error('Emails do not match!');
        } else {
            angular.element(document.querySelectorAll('.disabled'))[0].removeClass('disabled');
        }
    }

    cancel() {
        this.presenter = {};
        this.editedKeyParticipants = [];
        this.posterAbstract = {};
        this.poster = {};
    }


}

AdminParticipantsController.$inject = ['$scope', '$state', 'presenterService', 'posterAbstractService', 'posterService', 'keyParticipantService', 'presenters', 'abstracts', 'posters', 'keyParticipants', 'notificationService'];
app.controller('adminParticipantsController',  AdminParticipantsController);

