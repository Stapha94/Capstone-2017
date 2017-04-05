class AdminJudgeInfoController {

    static resolve() {
        return {
                judge: ['judges', '$stateParams', (judges, $stateParams) => {
                    return _.find(judges, {'judgeId': $stateParams.judgeId});
                }],
                forms: ['formService', 'judge', (formService, judge) => {
                    return formService.get({judgeId: judge.judgeId})
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

    constructor($scope, judgeService, formService, judge, judgeCategories, forms, posters) {
        this.$scope = $scope;
        this.judgeService = judgeService;
        this.formService = formService;
        this.original = judge;
        this.judge = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.judgeCategories = judgeCategories;
        this.forms = forms;
        this.form = { judgeId: judge.judgeId, total: 0 };
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

}

AdminJudgeInfoController.$inject = ['$scope', 'judgeService', 'formService', 'judge', 'judgeCategories', 'forms', 'posters'];
app.controller('adminJudgeInfoController', AdminJudgeInfoController);