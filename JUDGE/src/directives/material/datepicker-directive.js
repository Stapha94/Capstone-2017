class MaterialDatepickerDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.require = 'ngModel';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.pickadate({
                selectMonths: true,
                selectYears: 15
            });
        });
    }

    static directiveFactory($timeout) {
        MaterialDatepickerDirective.instance = new MaterialDatepickerDirective($timeout);
        return MaterialDatepickerDirective.instance;
    }
}

MaterialDatepickerDirective.directiveName = 'materialDatepicker';
MaterialDatepickerDirective.$inject = ['$timeout'];
app.directive(MaterialDatepickerDirective.directiveName, MaterialDatepickerDirective.directiveFactory);