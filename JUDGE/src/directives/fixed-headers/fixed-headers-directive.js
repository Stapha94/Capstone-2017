class FixedHeadersDirective {

    constructor($timeout, $window) {
        this.restrict = 'A';
        this.controller = 'fixedHeadersController';
        this.$timeout = $timeout;
        this.$window = angular.element($window);
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            if(element[0].offsetHeight > 300) {
                element[0].style.height = '300px';
            }
            var rows = element.find('tr');
            if(rows.length > 1) {
                var headers = rows[0].children; // Headers are the first row.
                var body = rows[1].children; // Use the first row for the body
                var index = 0;
/*                _.forEach(headers, (header) => {
                    if(header.offsetWidth < body[index].offsetWidth) {
                        header.style.width = body[index].offsetWidth+'px';
                    } else {
                        body[index].style.width = header.offsetWidth+'px';
                    }
                    index++;
                })*/
            }
        }, 60);
    }

    static directiveFactory($timeout, $window) {
        FixedHeadersDirective.instance = new FixedHeadersDirective($timeout, $window);
        return FixedHeadersDirective.instance;
    }
}

FixedHeadersDirective.directiveName = 'fixedHeaders';
FixedHeadersDirective.$inject = ['$timeout', '$window'];
app.directive(FixedHeadersDirective.directiveName, FixedHeadersDirective.directiveFactory);