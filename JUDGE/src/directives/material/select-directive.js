class MaterialSelectDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
        this.scope = {
            condition: '='
        }
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            element.material_select();
        });

        if(scope.condition !== undefined) {
            scope.$watch('condition', () => {
                if(!scope.condition) {
                    this.$timeout(() => {
                        element.material_select('destroy');
                    });
                }
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