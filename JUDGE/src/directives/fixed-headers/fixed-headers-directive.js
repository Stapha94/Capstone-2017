class FixedHeadersDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        this.$timeout(() => {
            var tbodies = element.find('tbody');
            if(tbodies.length > 0) {
                var tbody = tbodies[0];
                if(tbody.offsetHeight > 300) {
                    tbody.style.height = '300px';
                }
            }
            var rows = element.find('tr');
            if(rows.length > 1) {
                var headers = rows[0].children; // Headers are the first row.
                var body = rows[1].children; // Use the first row for the body
                var index = 0;
                _.forEach(headers, (header) => {
                    if(header.offsetWidth < body[index].offsetWidth) {
                        header.style.width = body[index].offsetWidth+'px';
                    } else {
                        body[index].style.width = header.offsetWidth+'px';
                    }
                    index++;
                })
            }
        }, 60);
    }

    static directiveFactory($timeout) {
        FixedHeadersDirective.instance = new FixedHeadersDirective($timeout);
        return FixedHeadersDirective.instance;
    }
}

FixedHeadersDirective.directiveName = 'fixedHeaders';
FixedHeadersDirective.$inject = ['$timeout'];
app.directive(FixedHeadersDirective.directiveName, FixedHeadersDirective.directiveFactory);