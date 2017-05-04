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
                var summitId = localStorageService.get('summit') === undefined ? 0 : localStorageService.get('summit').summitId;
                return posterService.get({summitId: summitId, active: 1})
                    .then((data) => {
                        return data;
                    });
            }],
            forms: ['formService', 'localStorageService', (formService, localStorageService) => {
                var summitId = localStorageService.get('summit') === undefined ? 0 : localStorageService.get('summit').summitId;
                return formService.get({summitId: summitId})
                    .then((data) => {
                        return data;
                    });
            }],
            judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                return judgeCategoryService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }],
            posterCategories: ['posterCategoryService', (posterCategoryService) => {
                return posterCategoryService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor($scope, formService, judges, posters, forms, judgeCategories, posterCategories, notificationService) {
        this.formService = formService;
        this.notificationService = notificationService;
        this.judges = judges;
        this.originalPosters = posters;
        this.posters = angular.copy(this.originalPosters);
        this.originalForms = forms;
        this.forms = angular.copy(this.originalForms);
        this.judgeCategories = judgeCategories;
        this.posterCategories = posterCategories;
        this.selectedPosters = [];
        this.selectedForms = [];
        this.removedPosters = [];
        _.forEach(this.judgeCategories, (judgeCategory) => {
            judgeCategory.judgeId = '';
            judgeCategory.posterCategoryId = '';
            // Filter unassigned posters
            $scope.$watch(() => { return judgeCategory.judgeId }, (newVal, oldVal) => {
                this.posters = angular.copy(this.originalPosters);
                this.removedPosters = _.remove(this.posters, (poster) => {
                    var form = _.find(this.originalForms, {judgeId: newVal, posterId: poster.posterId})
                    return form ? true : false;
                })
            }, true);
        });
        this.judgeCategory = this.judgeCategories.length > 0 ? this.judgeCategories[0] : undefined;
        $scope.$watch(() => { return this.judgeCategory }, (newVal, oldVal) => {
            this.posters = angular.copy(this.originalPosters);
            this.removedPosters = _.remove(this.posters, (poster) => {
                var form = _.find(this.originalForms, {judgeId: newVal.judgeId, posterId: poster.posterId})
                return form ? true : false;
            })
        }, true);
    }

    getStatus(form) {
        return form.judged === '1' ? 'Judged' : 'Blank';
    }

    changeCategory(judgeCategory) {
        this.judgeCategory = judgeCategory;
    }

    assign(judgeCategory) {
        _.forEach(this.selectedPosters, (selected) => {
            _.pull(this.posters, selected);
            this.removedPosters.push(selected);
            var newForm = { judgeId: judgeCategory.judgeId, posterId: selected.posterId};
            this.formService.create(newForm)
                .then((form) => {
                    this.forms.push(form);
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

    unassign(judgeCategory) {
        _.pullAll(this.forms, this.selectedForms);
        _.forEach(this.selectedForms, (form) => {
            this.formService.delete(form.formId)
                .then(() => {
                    var newPoster = _.remove(this.removedPosters, {posterId: form.posterId});
                    if(newPoster.length === 1) {
                        this.posters.push(newPoster[0]);
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

    selected(judgeCategory) {
        return ( judgeCategory.judgeId !== null && judgeCategory.judgeId !== undefined && judgeCategory.judgeId !== '' &&
                judgeCategory.posterCategoryId !== null && judgeCategory.posterCategoryId !== undefined && judgeCategory.posterCategoryId !== '');
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

    selectAllPosters(posterCategoryId) {
        var posters = _.filter(this.posters, {posterCategoryId: posterCategoryId});
        if(posters.length === this.selectedPosters.length) {
            _.forEach(posters, (poster) => {

            }); 
        } else {
            _.forEach(posters, (poster) => {
                if(poster.posterCategoryId === posterCategoryId) {
                    if(_.find(this.selectedPosters)) {
                        
                    }
                }
            });
        }
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
        var element = angular.element(e.target.parentElement); // This is a little hacky; preferably, this should be in a directive, but oh well
        if(element.hasClass('active')) {
            element.removeClass('active');
        } else {
            element.addClass('active');
        }
    }

    reset() {
        this.selectedPosters = [];
        this.selectedForms = [];
    }

    removeActivePosters() {
      var elements = angular.element(document.querySelectorAll('table.unassigned-posters tbody tr.active'));
      _.forEach(elements, (element) => {
          element = angular.element(element);
          element.removeClass('active');
      });
    }

    removeActiveForms() {
      var elements = angular.element(document.querySelectorAll('table.assigned-posters tbody tr.active'));
      _.forEach(elements, (element) => {
          element = angular.element(element);
          element.removeClass('active');
      });
    }

}

AdminAssignPostersController.$inject = ['$scope', 'formService', 'judges', 'posters', 'forms', 'judgeCategories', 'posterCategories', 'notificationService'];
app.controller('adminAssignPostersController', AdminAssignPostersController);