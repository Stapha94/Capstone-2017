class ViewFormModalController {

    constructor($scope) {
        this.form = $scope.form;
        this.formQuestions = $scope.formQuestions;
        this.scores = [
                { id: '1', label: 'poor' },
                { id: '2', label: 'adequate'},
                { id: '3', label: 'fair' },
                { id: '4', label: 'good' },
                { id: '5', label: 'excellent' }
            ];
        this.setup();
    }

    setup() {
        if(this.form.total !== '0' && this.form.judged === '1') {
            this.furtherEvaluation = true;
        } else {
            this.furtherEvaluation = false;
        }
        this.sections = [];
        _.forEach(this.formQuestions, (formQuestion) => {
            if(!_.find(this.sections, { title: formQuestion.section })) {
                var section = { title: formQuestion.section };
                this.sections.push(section);
            }
        })
    }

}

ViewFormModalController.$inject = ['$scope'];
app.controller('viewFormModalController', ViewFormModalController);