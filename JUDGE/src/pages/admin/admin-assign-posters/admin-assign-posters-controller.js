class AdminAssignPostersController {

    static resolve() {
        return {
            judges: ['judgeService', (judgeService) => {
                return judgeService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }],
            posters: ['posterService', 'localStorageService', (posterService, localStorageService) => {
                return posterService.get({summitId: parseInt(localStorageService.get('summit').summitId)})
                    .then((data) => {
                        return data;
                    });
            }],
            forms: ['formService', 'localStorageService', (formService, localStorageService) => {
                return formService.get({summitId: parseInt(localStorageService.get('summit').summitId)})
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor($scope, formService, judges, posters, forms, notificationService) {
        this.formService = formService;
        this.notificationService = notificationService;
        this.judges = judges;
        this.originalPosters = posters;
        this.posters = angular.copy(this.originalPosters);
        this.originalForms = forms;
        this.forms = angular.copy(this.originalForms);
        this.judgeId = '';
        this.selectedPosters = [];
        this.selectedForms = [];
        this.removedPosters = [];
        // Filter unassigned posters
        $scope.$watch(() => { return this.judgeId }, (newVal, oldVal) => {
            this.posters = angular.copy(this.originalPosters);
            this.removedPosters = _.remove(this.posters, (poster) => {
                var form = _.find(this.originalForms, {judgeId: newVal, posterId: poster.posterId})
                return form ? true : false;
            })
        }, true);
    }

    assign() {
        _.forEach(this.selectedPosters, (selected) => {
            _.pull(this.posters, selected);
            this.removedPosters.push(selected);
            var newForm = { judgeId: this.judgeId, posterId: selected.posterId};
            this.formService.create(newForm)
                .then((form) => {
                    this.forms.push(form);
                    this.originalPosters = angular.copy(this.posters);
                    this.originalForms = angular.copy(this.forms);
                    _.pull(this.selectedPosters, selected);
                })
                .catch(() => {
                    this.posters = angular.copy(this.originalPosters);
                    this.selectedPosters = [];
                    this.removeActivePosters();
                });
        });
    }

    unassign() {
        _.pullAll(this.forms, this.selectedForms);
        _.forEach(this.selectedForms, (form) => {
            this.formService.delete(form.formId)
                .then(() => {
                    var newPoster = _.remove(this.removedPosters, {posterId: form.posterId});
                    if(newPoster.length === 1) {
                        this.posters.push(newPoster[0]);
                        this.originalPosters = angular.copy(this.posters);
                        this.originalForms = angular.copy(this.forms);
                        _.pull(this.selectedForms, form);
                    }
            })
            .catch(() => {
                this.forms = angular.copy(this.originalForms);
                this.selectedForms = [];
                this.removeActiveForms();
            })
        });
    }

    judgeSelected() {
        return this.judgeId !== null && this.judgeId !== undefined && this.judgeId !== '';
    }

    selectPoster(poster, e) {
        var existing = _.find(this.selectedPosters, poster);
        if(existing) {
            _.remove(this.selectedPosters, poster);
        } else {
            this.selectedPosters.push(poster);
        }
        this.select(e);
    }

    selectForm(form, e) {
        if(isTrue(form.judged)) {
            this.notificationService.error('Cannot select poster that has already been judged!');
        } else {
            var existing = _.find(this.selectedForms, form);
            if(existing) {
                _.remove(this.selectedForms, form);
            } else {
                this.selectedForms.push(form);
            }
            this.select(e);
        }
    }

    select(e) {
        var element = angular.element(e.target);
        if(element.hasClass('active')) {
            element.removeClass('active');
        } else {
            element.addClass('active');
        }
    }

    removeActivePosters() {
      var elements = angular.element(document.querySelectorAll('table.unassigned-posters tbody td.active'));
      _.forEach(elements, (element) => {
          element.removeClass('active');
      });
    }

    removeActiveForms() {
      var elements = angular.element(document.querySelectorAll('table.assigned-posters tbody td.active'));
      _.forEach(elements, (element) => {
          element.removeClass('active');
      });
    }

}

AdminAssignPostersController.$inject = ['$scope', 'formService', 'judges', 'posters', 'forms', 'notificationService'];
app.controller('adminAssignPostersController', AdminAssignPostersController);