class FixedHeadersDirective {

    constructor($timeout, $window) {
        this.restrict = 'A';
        this.controller = 'fixedHeadersController';
        this.$window = angular.element($window);
    }

    link(scope, element, attribute, controller) {
        var interval = setInterval(() => {
            var scroll = element.find('div.scrollable')[0];
            if(scroll.offsetHeight > 500) {
                scroll.style.height = '500px';
            }
            var tables = element.find('table');
            if(tables.length > 1) {
                var headers = angular.element(tables[0]).find('th'); // Main header
                var subHeaders = angular.element(tables[2]).find('th'); // Sub header
                if(subHeaders.length > 0) {
                    var index = 0;
                    _.forEach(headers, (header) => {
                        header.style.width = subHeaders[index].offsetWidth+'px';
                        index++;
                    });
                }
                if(tables[0].offsetWidth === tables[2].offsetWidth) {
                    clearInterval(interval);
                }
            }
        }, 1000);
    }

    static directiveFactory($timeout, $window) {
        FixedHeadersDirective.instance = new FixedHeadersDirective($timeout, $window);
        return FixedHeadersDirective.instance;
    }
}

FixedHeadersDirective.directiveName = 'fixedHeaders';
FixedHeadersDirective.$inject = ['$timeout', '$window'];
app.directive(FixedHeadersDirective.directiveName, FixedHeadersDirective.directiveFactory);