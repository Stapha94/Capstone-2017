class AddPosterModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-poster-modal/add-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddPosterModalDirective.instance = new AddPosterModalDirective();
        return AddPosterModalDirective.instance;
    }

}
app.directive('addPosterModal', AddPosterModalDirective.directiveFactory);