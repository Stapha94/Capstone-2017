class JudgeFormController {

    constructor($scope, $state, form, formQuestions, questions, questionSections, formService, formQuestionService) {
        this.questions = questions;
        this.questionSections = questionSections;
        this.form = form;
        this.formQuestions = formQuestions;
        this.formService = formService;
        this.formQuestionService = formQuestionService;
        this.$state = $state;
        this.scores = [
                { id: 1, label: 'poor' },
                { id: 2, label: 'adequate'},
                { id: 3, label: 'fair' },
                { id: 4, label: 'good' },
                { id: 5, label: 'excellent' }
            ];
        this.setupForm();
    }

    submit() {
        this.formService.update(this.form)
            .then((data) => {
                this.formQuestionService.update(this.formQuestions)
                    .then((data) => {
                        this.$state.go('judge.dashboard');
                    });
            });
    }

    // This creates a form and form questions if its the first time accessing the page
    setupForm() {
        if(this.formQuestions.length === 0) {
            _.forEach(this.questions, (question) => {
                var formQuestion = { questionId: question.questionId, section: question.section, description: question.description, score: 0 };
                this.formQuestions.push(formQuestion);
            });
            if(!this.form.formId) {
                this.formService.create(this.form)
                    .then((form) => {
                        _.forEach(this.formQuestions, (formQuestion) => {
                            formQuestion['formId'] = form.formId;
                        });
                        this.formQuestionService.create(this.formQuestions);
                    });
            } else {
                _.forEach(this.formQuestions, (formQuestion) => {
                    formQuestion['formId'] = this.form.formId;
                });
                this.formQuestionService.create(this.formQuestions);
            }
        } else {
            _.forEach(this.formQuestions, (formQuestion) => {
                formQuestion.score = parseInt(formQuestion.score); // Our db returns the number as a string. This is annoying but necessary for the form to work properly.
            });
        }
    }

    sum() {
        this.form.total = 0;
        _.forEach(this.formQuestions, (formQuestion) => {
            this.form.total += formQuestion.score;
        });
    }

}

JudgeFormController.$inject = ['$scope', '$state', 'form', 'formQuestions', 'questions', 'questionSections', 'formService', 'formQuestionService'];
app.controller('judgeFormController', JudgeFormController);