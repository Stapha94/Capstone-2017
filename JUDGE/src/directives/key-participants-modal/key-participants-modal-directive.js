class KeyParticipantsModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'views/directives/key-participants-modal/key-participants-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        KeyParticipantsModalDirective.instance = new KeyParticipantsModalDirective();
        return KeyParticipantsModalDirective.instance;
    }

}
app.directive('keyParticipantsModal', KeyParticipantsModalDirective.directiveFactory);