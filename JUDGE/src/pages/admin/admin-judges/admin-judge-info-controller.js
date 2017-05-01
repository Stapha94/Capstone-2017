class AdminJudgeInfoController {

    static resolve() {
        return {
                summits: ['summitService', (summitService) => {
                    return summitService.get()
                        .then((data) => {
                            return data;
                        });
                }],
                judge: ['judgeService', '$stateParams', (judgeService, $stateParams) => {
                    return judgeService.get({judgeId: $stateParams.judgeId})
                        .then((data) => {
                            return data[0];
                        });
                }],
                judgeCategories: ['judgeCategoryService', (judgeService) => {
                    return judgeService.get()
                        .then((data) => {
                            return data;
                        });
                }],
                forms: ['formService', 'judge', (formService, judge) => {
                    return formService.get({judgeId: judge.judgeId})
                        .then((data) => {
                            return data;
                        })
                }],
                formQuestions: ['formQuestionService', 'judge', (formQuestionService, judge) => {
                    return formQuestionService.get({judgeId: judge.judgeId})
                        .then((data) => {
                            return data;
                        })
                }],
                posters: ['posterService', 'localStorageService', (posterService, localStorageService) => {
                    return posterService.get({summitId: localStorageService.get('summit').summitId})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, judgeService, formService, summits, judge, judgeCategories, forms, formQuestions, posters) {
        this.$scope = $scope;
        this.judgeService = judgeService;
        this.formService = formService;
        this.original = judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = judgeCategories;
        this.forms = _.orderBy(forms, (form) => {return form.total}, ['desc']);
        this.formQuestions = formQuestions;
        this.summits = summits;
        var activeSummit = _.filter(summits, {active: '1'})[0];
        this.summitId = activeSummit ? activeSummit.summitId : undefined;
        if(forms[0] !== undefined) {
            this.form = forms[0];
        } else {
            this.form = {};
        }
        this.singleFormQuestions = _.filter(this.formQuestions, {formId: this.form.formId});
        this.posters = _.differenceWith(posters, forms, (poster, form) => {
            return poster.posterId === form.posterId;
        });
        this.canEdit = false;
        this.modal = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.judgeService.update(this.judge)
            .then((data) => {
                this.canEdit = false;
                if(this.judge.judgeCategoryId !== this.original.judgeCategoryId) {
                    _.forEach(this.judgeCategories, (category) => {
                        if(this.judge.judgeCategoryId === category.judgeCategoryId) {
                            this.judge.category = category.title;
                        }
                    })
                }
                this.original = angular.copy(this.judge);
            })
            .catch((error) => {
                this.canEdit = false;
                this.judge = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.judge = angular.copy(this.original);
    }

    // Poster Modal functions

    assign() {
        this.formService.create(this.form)
            .then((form) => {
                angular.element('.modal').modal('close');
                this.setModal();
                this.forms.push(form);
                this.posters = _.remove(this.posters, (poster) => {
                    return poster.posterId === form.posterId;
                })
            });
    }

    close() {
        this.form = { judgeId: this.original.judgeId, total: 0 };
        this.setModal();
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

    setForm(form) {
        this.form = form;
        this.singleFormQuestions = _.filter(this.formQuestions, {formId: form.formId});
    }

    remove(form) {
        if(form.judged === '0') {
            this.formService.delete(form.formId)
                .then(() => {
                   _.remove(this.forms, form); 
                });
        }
    }

}

AdminJudgeInfoController.$inject = ['$scope', 'judgeService', 'formService', 'summits', 'judge', 'judgeCategories', 'forms', 'formQuestions', 'posters'];
app.controller('adminJudgeInfoController', AdminJudgeInfoController);