class AdminSettingsController {

    constructor($state) {
        this.tabs = [
            { title: 'Institutions', id: 'institutions', state: 'home.admin.settings.site.institutions' },
            { title: 'Roles', id: 'roles', state: 'home.admin.settings.site.roles' },
            { title: 'Awards', id: 'awards', state: 'home.admin.settings.site.awards' },
            { title: 'Judge Categories', id: 'judge-categories', state: 'home.admin.settings.site.judge-categories' },
            { title: 'Poster Categories', id: 'poster-categories', state: 'home.admin.settings.site.poster-categories' },
            { title: 'Questions', id: 'questions', state: 'home.admin.settings.site.questions' },
            { title: 'Question Sections', id: 'question-sections', state: 'home.admin.settings.site.question-sections' }
        ]

    }

}

AdminSettingsController.$inject = ['$state'];
app.controller('adminSettingsController', AdminSettingsController);