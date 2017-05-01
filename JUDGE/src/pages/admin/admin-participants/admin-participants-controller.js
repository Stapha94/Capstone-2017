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

    constructor($scope, $state, presenterService, posterAbstractService, posterService, keyParticipantService, summits, presenters, abstracts, posters, keyParticipants, notificationService) {
        this.presenterService = presenterService;
        this.posterAbstractService = posterAbstractService;
        this.posterService = posterService;
        this.keyParticipantService = keyParticipantService;
        this.notificationService = notificationService;
        this.summits = summits;
        var activeSummit = _.filter(this.summits, {active: '1'})[0];
        this.summitId = activeSummit ? activeSummit.summitId : undefined;
        this.presenters = presenters;
        this.abstracts = abstracts;
        this.posters = posters;
        this.keyParticipants = keyParticipants;
        this.presenterAbstract = {};
        this.presenter = {};
        this.editedKeyParticipants = [];
        this.posterAbstract = {};
        this.poster = {};
        this.activeSummit = false;
        _.forEach(this.summits, (summit) => {
            if(isTrue(summit.active)) {
                this.activeSummit = true;
            }
        });
        // Adds the submission date to the presenter. Oversight on our part.
        _.forEach(this.presenters, (presenter) => {
            var poster = _.filter(this.posters, {presenterId: presenter.presenterId })[0];
            if(poster) {
                presenter.submissionDate = poster.submissionDate;
            } 
        });
    }

    getFullName(presenter) {
        return presenter.suffix === null || presenter.suffix === undefined || presenter.suffix === '' ? 
            presenter.firstName + ' ' + presenter.lastName : 
            presenter.firstName + ' ' + presenter.lastName + ', ' + presenter.suffix;
    }

    downloadAbstract(presenter) {
        this.getPoster(presenter);
        var name = this.presenterAbstract.title+'.pdf';
        var abstractDoc = {
            header: function(currentPage, pageCount) { 
                return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: [2, 2, 5, 0]};
            },
            background: { },
            content: [
                { text: this.presenterAbstract.title, style: 'header', alignment: 'center'},
                { text: 'Objective', style: 'subheader'},
                this.presenterAbstract.objective,
                { text: 'Methods', style: 'subheader'},
                this.presenterAbstract.methods,
                { text: 'Results', style: 'subheader'},
                this.presenterAbstract.results,
                { text: 'Conclusion', style: 'subheader'},
                this.presenterAbstract.conclusion
            ],

            styles: {
                header: {
                    fontSize: 28,
                    bold: true,
                    margin: [0, 10]
                },
                subheader: {
                    fontSize: 22,
                    bold: true,
                    margin: [0,25,0,5]
                }
            }
        };
        pdfMake.createPdf(abstractDoc).download(name);
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
        this.presenterService.update(presenter);
    }

    deactivate(presenter) {
        presenter.active = '0';
        this.presenterService.update(presenter);
    }


}

AdminParticipantsController.$inject = ['$scope', '$state', 'presenterService', 'posterAbstractService', 'posterService', 'keyParticipantService', 'summits', 'presenters', 'abstracts', 'posters', 'keyParticipants', 'notificationService'];
app.controller('adminParticipantsController',  AdminParticipantsController);

