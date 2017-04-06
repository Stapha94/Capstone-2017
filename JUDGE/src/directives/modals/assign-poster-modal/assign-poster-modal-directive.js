class AssignPosterModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/assign-poster-modal/assign-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AssignPosterModalDirective.instance = new AssignPosterModalDirective();
        return AssignPosterModalDirective.instance;
    }

}
app.directive('assignPosterModal', AssignPosterModalDirective.directiveFactory);