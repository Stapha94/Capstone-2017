class ForgotPasswordModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/forgot-password-modal/forgot-password-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        ForgotPasswordModalDirective.instance = new ForgotPasswordModalDirective();
        return ForgotPasswordModalDirective.instance;
    }

}
app.directive('forgotPasswordModal', ForgotPasswordModalDirective.directiveFactory);