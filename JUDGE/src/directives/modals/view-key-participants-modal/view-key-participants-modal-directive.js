class ViewKeyParticipantsModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-key-participants-modal/view-key-participants-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        ViewKeyParticipantsModalDirective.instance = new ViewKeyParticipantsModalDirective();
        return ViewKeyParticipantsModalDirective.instance;
    }

}
app.directive('viewKeyParticipantsModal', ViewKeyParticipantsModalDirective.directiveFactory);