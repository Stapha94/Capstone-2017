class AdminReportingController {

    static resolve() {
        return {
            summits: ['summitService', (summitService) => {
            return summitService.get()
                .then((data) => {
                    return data;
                });
            }],
            summit: ['$stateParams', 'summits', 'localStorageService', ($stateParams, summits, localStorageService) => {
                if($stateParams.summitId) {
                    return _.find(summits, {summitId: $stateParams.summitId});
                } else {
                    return localStorageService.get('summit');
                }
            }],
            posters: ['posterService', 'summit', (posterService, summit) => {
                return posterService.get()
                    .then((data) => {
                        return data;
                    })
            }],
            forms: ['formService', 'summit', (formService, summit) => {
                return formService.get({summitId: summit.summitId})
                    .then((data) => {
                        return data;
                    });
            }],
            formQuestions: ['formQuestionService', 'summit', (formQuestionService, summit) => {
                return formQuestionService.get({summitId: summit.summitId})
                    .then((data) => {
                        return data;
                    });
            }],
            questions: ['questionService', (questionService) => {
                return questionService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }],
            judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
               return judgeCategoryService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor(posterService, summit, summits, posters, forms, formQuestions, questions, judgeCategories) {
        this.posterService = posterService;
        this.summitId = summit.summitId;
        this.summits = summits;
        this.originalPosters = posters;
        this.posters = angular.copy(this.originalPosters);
        this.originalForms = forms;
        this.forms = angular.copy(this.originalForms);
        this.originalFormQuestions = formQuestions;
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.originalQuestions = questions;
        this.questions = angular.copy(this.originalQuestions);
        this.judgeCategories = judgeCategories;
        this.reportGenerated = false;
    }

    changeSummit() {
        this.reportGenerated = false;
    }

    generateReport() {
        this.posters = _.filter(this.originalPosters, { summitId: this.summitId });
        _.forEach(this.posters, (poster) => {
            var posterForms = _.filter(this.forms, (form) => { return poster.posterId === form.posterId && isTrue(form.judged) });
            var sum = 0;
            var numOfForms = 0;
            _.forEach(posterForms, (form) => {
                sum += form.total;
                numOfForms++;
            });
            numOfForms = numOfForms === 0 ? 1 : numOfForms;
            poster.score = sum/numOfForms;
            this.posterService.update(poster);
        });
        this.reportGenerated = true;
    }

    getLeadAuthor(form) {
        return form.suffix !== null && form.suffix !== undefined && form.suffix !== '' ? 
            form.firstName + ' ' + form.lastName + ' ' + form.suffix : 
            form.firstName + ' ' + form.lastName; 
    }

    viewScores(poster) {
        this.forms = _.remove(this.forms, (form) => { return poster.posterId === form.posterId && isTrue(form.judged) });
    }

    // This retrieves the average performance for each question
    viewPerformance(poster) {
        this.formQuestions = _.remove(this.formQuestions, (question) => { return question.posterId === poster.posterId });
        _.forEach(this.questions, (question) => {
            var sum = 0;
            var numOfForms = 0;
            this.formQuestionPerForms = _.filter(this.formQuestions, { questionId: question.questionId });
            _.forEach(this.formQuestionPerForms, (formQuestion) => {
                sum += parseInt(formQuestion.score); // Backend returns ints as strings
                numOfForms++;
            });
            numOfForms = numOfForms === 0 ? 1 : numOfForms;
            question.average = sum/numOfForms;
        });
    }

    closeViewScores() {
        this.forms = angular.copy(this.originalForms);
    }

    closeViewPerformance() {
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.questions = angular.copy(this.originalQuestions);
    }

}

AdminReportingController.$inject = ['posterService', 'summit', 'summits', 'posters', 'forms', 'formQuestions', 'questions', 'judgeCategories']
app.controller('adminReportingController', AdminReportingController);