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

}

QuestionsController.$inject = ['questionService', 'questions', 'questionSections'];
app.controller('questionsController', QuestionsController);