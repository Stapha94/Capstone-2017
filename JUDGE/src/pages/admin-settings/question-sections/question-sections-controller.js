class QuestionSectionsController extends BaseSiteController {

    static resolve() {
        return {
                questionSections: ['questionSectionService', (questionSectionService) => {
                    return questionSectionService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(questionSectionService, questionSections) {
        super(questionSectionService, questionSections);
    }

}

QuestionSectionsController.$inject = ['questionSectionService', 'questionSections'];
app.controller('questionSectionsController', QuestionSectionsController);