class MaterialSelectDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
        this.scope = {
            condition: '='
        };
    }

    link(scope, element, attribute, controller) {
        if(scope.condition !== undefined) {
            scope.$watch(() => {
                return scope.condition;
            }, () => {
                if(!scope.condition) {
                    this.$timeout(() => {
                        element.material_select('destroy');
                    });
                } else {
                    this.$timeout(() => {
                        element.material_select();
                    });
                }
            }, true);
        } else {
            this.$timeout(() => {
                element.material_select();
            });
        }
    }

    static directiveFactory($timeout) {
        MaterialSelectDirective.instance = new MaterialSelectDirective($timeout);
        return MaterialSelectDirective.instance;
    }
}

MaterialSelectDirective.directiveName = 'materialSelect';
MaterialSelectDirective.$inject = ['$timeout'];
app.directive(MaterialSelectDirective.directiveName, MaterialSelectDirective.directiveFactory);