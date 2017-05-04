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