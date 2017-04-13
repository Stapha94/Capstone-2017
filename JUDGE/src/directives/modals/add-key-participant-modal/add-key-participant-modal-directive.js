class AddKeyParticipantModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/add-key-participant-modal/add-key-participant-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        AddKeyParticipantModalDirective.instance = new AddKeyParticipantModalDirective();
        return AddKeyParticipantModalDirective.instance;
    }

}
app.directive('addKeyParticipantModal', AddKeyParticipantModalDirective.directiveFactory);