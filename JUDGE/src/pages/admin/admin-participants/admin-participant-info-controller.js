class AdminPresenterInfoController {

    static resolve() {
        return {
                presenter: ['presenterService', '$stateParams', (presenterService, $stateParams) => {
                    return presenterService.get({presenterId: $stateParams.presenterId})
                        .then((data) => {
                            return data[0];
                        });
                }],
                keyParticipants: ['keyParticipantService', 'presenter', (keyParticipantService, presenter) => {
                    return keyParticipantService.get({presenterId: presenter.presenterId})
                        .then((data) => {
                            return data;
                        })
                }],
                poster: ['posterService', 'presenter', (posterService, presenter) => {
                    return posterService.get({presenterId: presenter.presenterId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                posterAbstract: ['posterAbstractService', 'poster', (posterAbstractService, poster) => {
                    return posterAbstractService.get({posterId: poster.posterId})
                        .then((data) => {
                            return data[0];
                        })
                }],
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }],
                roles: ['roleService', (roleService) => {
                    return roleService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, presenterService, keyParticipantService, posterAbstractService, presenter, keyParticipants, posterAbstract, institutions, roles, notificationService) {
        this.$scope = $scope;
        this.presenterService = presenterService;
        this.keyParticipantService = keyParticipantService;
        this.posterAbstractService   = posterAbstractService;
        this.notificationService = notificationService;
        this.original = presenter;
        this.presenter = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.originalPosterAbstract = posterAbstract;
        this.posterAbstract = angular.copy(this.originalPosterAbstract);
        this.keyParticipants = keyParticipants;
        this.keyParticipant = {presenterId: this.presenter.presenterId};
        this.institutions = institutions;
        this.roles = roles;
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    updatePresenter() {
        this.presenterService.update(this.presenter)
            .then((data) => {
                this.canEdit = false;
                this.original = angular.copy(this.presenter);
            })
            .catch((error) => {
                this.canEdit = false;
                this.presenter = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.presenter = angular.copy(this.original);
    }

    addKeyParticipant() {
        this.keyParticipantService.create(this.keyParticipant)
            .then((keyParticipant) => {
                this.keyParticipants.push(keyParticipant);
                this.keyParticipant = {presenterId: this.presenter.presenterId};
            });
    }

    cancelKeyParticipant() {
        this.keyParticipant = {presenterId: this.presenter.presenterId};
    }

    deleteKeyParticipant(keyParticipant) {
        this.keyParticipantService.delete(keyParticipant.keyParticipantId)
            .then(() => {
                _.remove(this.keyParticipants, keyParticipant);
            });
    }

    updatePosterAbstract() {
        this.posterAbstractService.update(this.posterAbstract)
            .then(() => {
                this.originalPosterAbstract = angular.copy(this.posterAbstract);
            });
    }

    cancelPosterAbstract() {
        this.posterAbstract = angular.copy(this.originalPosterAbstract);
    }

}

AdminPresenterInfoController.$inject = ['$scope', 'presenterService', 'keyParticipantService', 'posterAbstractService', 'presenter', 'keyParticipants', 'posterAbstract', 'institutions', 'roles', 'notificationService'];
app.controller('adminPresenterInfoController', AdminPresenterInfoController);