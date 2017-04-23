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

    constructor($filter, posterService, summit, summits, posters, forms, formQuestions, questions, judgeCategories, reportService) {
        this.$filter = $filter;
        this.posterService = posterService;
        this.summit = summit;
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
        this.reportService = reportService;
        this.posterForms = [];
    }

    changeSummit() {
        this.reportGenerated = false;
    }

    generateReport() {
        this.posters = _.filter(this.originalPosters, { summitId: this.summitId, active: '1' });
        _.forEach(this.posters, (poster) => {
            var posterForms = _.filter(this.forms, (form) => { return poster.posterId === form.posterId && isTrue(form.judged) });
            var sum = 0;
            var numOfForms = 0;
            _.forEach(posterForms, (form) => {
                sum += parseInt(form.total);
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
        this.posterForms = _.filter(this.forms, (form) => { return poster.posterId === form.posterId && isTrue(form.judged) });
    }

    // This retrieves the average performance for each question
    viewPerformance(poster) {
        this.posterFormQuestions = _.filter(this.formQuestions, (question) => { return question.posterId === poster.posterId });
        _.forEach(this.questions, (question) => {
            var sum = 0;
            var numOfForms = 0;
            this.posterFormQuestionPerForms = _.filter(this.posterFormQuestions, { questionId: question.questionId });
            _.forEach(this.posterFormQuestionPerForms, (formQuestion) => {
                sum += parseInt(formQuestion.score); // Backend returns ints as strings
                numOfForms++;
            });
            numOfForms = numOfForms === 0 ? 1 : numOfForms;
            question.average = sum/numOfForms;
        });
    }

    // This is explicitly for the downloaded report
    calculatePerformance(poster) {
        var formQuestions = _.filter(this.formQuestions, (question) => { return question.posterId === poster.posterId });
        var index = 1;
        _.forEach(this.questions, (question) => {
            var sum = 0;
            var numOfForms = 0;
            this.formQuestionPerForms = _.filter(formQuestions, { questionId: question.questionId });
            _.forEach(this.formQuestionPerForms, (formQuestion) => {
                sum += parseInt(formQuestion.score); // Backend returns ints as strings
                numOfForms++;
            });
            numOfForms = numOfForms === 0 ? 1 : numOfForms;
            poster['question'+index] = this.$filter('number')(sum/numOfForms, 2); // Filters to 2 decimal places
            index++;
        });
    }

    // Calculates the status based on the forms.
    // Returns pending if even one form is unaccounted for. Returns complete, otherwise.
    getStatus(poster) {
        var forms = _.filter(this.forms, {posterId: poster.posterId});
        var complete = true;
        var unassigned = false;
        if(forms.length === 0) {
            unassigned = true;
        }
        _.forEach(forms, (form) => {
            if(!isTrue(form.judged)) {
                complete = false;
            }
        });
        return unassigned ? 'Unassigned' : complete ? 'Complete' : 'Pending';
    }

    closeViewScores() {
        this.forms = angular.copy(this.originalForms);
    }

    closeViewPerformance() {
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.questions = angular.copy(this.originalQuestions);
    }

    download() {
        var summitDate = this.$filter('date')(this.summit.summitStart, 'mediumDate');
        var fileName = summitDate.replace(/,/g, "").replace(/ /g, "_") + '.csv';
        var generatedPosters = _.filter(this.posters, {summitId: this.summitId});
        generatedPosters = _.orderBy(generatedPosters, (poster) => {return poster.score}, ['desc']);
        var data = [];
        var headers = {
            posterNumber: 'Poster #',
            leadAuthor: 'Lead Author',
            category: 'Category',
            department: 'Department',
            title: 'Title',
            status: 'Status',
            score: 'Score'
        };
        var index = 1;
        _.forEach(this.questions, (question) => {
            headers['question'+index] = question.description;
            index++;
        })
        data.push(headers);
        _.forEach(generatedPosters, (poster) => {
            var item = {};
            item.posterNumber = poster.category + ' ' + poster.posterNumber;
            item.leadAuthor = this.getLeadAuthor(poster);
            item.category = poster.role;
            item.department = poster.institution;
            item.title = poster.posterTitle;
            item.status = this.getStatus(poster);
            item.score = this.$filter('number')(poster.score, 2); // Filters to 2 decimal places
            this.calculatePerformance(poster);
            index = 1;
            _.forEach(this.questions, (question) => {
                item['question'+index] = poster['question'+index];
                index++;
            })
            data.push(item);
        });
        this.reportService.generate(data, fileName);
    }

}

AdminReportingController.$inject = ['$filter', 'posterService', 'summit', 'summits', 'posters', 'forms', 'formQuestions', 'questions', 'judgeCategories', 'reportService'];
app.controller('adminReportingController', AdminReportingController);