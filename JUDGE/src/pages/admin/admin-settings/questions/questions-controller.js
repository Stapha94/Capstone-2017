class QuestionsController extends BaseSiteTableModelController {

    static resolve() {
        return {
            questions: ['questionService', (questionService) => {
                return questionService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            questionSections: ['questionSectionService', (questionSectionService) => {
                return questionSectionService.get()
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor(questionService, questions, questionSections) {
        super(questionService, questions);
        this.questionSections = questionSections;
        this.section = questionSections[0].questionSectionId;
    }

    edit() {
        this.service.update(this.model)
            .then((model) => {
                _.forEach(this.models, (item) => {
                    if(angular.equals(item, this.original)) {
                        // This iterates through each key for the model and applies the new update
                        // This is crucial to making the UI updates
                        _.forEach(item, (value, key) => {
                             if(this.model[key]) {
                                 item[key] = this.model[key];
                             }
                             if(key === 'questionSectionId') {
                                _.forEach(this.questionSections, (questionSection) => {
                                    if(questionSection.questionSectionId === item.questionSectionId) {
                                        item.section = questionSection.title;
                                    }
                                });
                             }
                        })
                    }
                });
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                this.model = {active: '1'};
            });
    }

    // Resets the select fields.
    // Based on: http://stackoverflow.com/questions/37399188/jquery-materialize-changing-select-option-back-to-disabled-select-on-clear
    reset() {
        var selects = angular.element(document.querySelectorAll('select'));
        _.forEach(selects, (select) => {
            if(select.id !== 'section') {
                select = angular.element(select);
                //select.val('None'); //Different approach here required for some reason
                //select.material_select();
            }
        })
    }

}

QuestionsController.$inject = ['questionService', 'questions', 'questionSections'];
app.controller('questionsController', QuestionsController);