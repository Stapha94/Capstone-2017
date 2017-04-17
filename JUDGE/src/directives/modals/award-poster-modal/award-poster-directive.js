class AwardPosterModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/award-poster-modal/award-poster-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AwardPosterModalDirective.instance = new AwardPosterModalDirective();
        return AwardPosterModalDirective.instance;
    }

}
app.directive('awardPosterModal', AwardPosterModalDirective.directiveFactory);