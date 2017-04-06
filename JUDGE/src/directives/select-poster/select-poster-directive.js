class PosterSelectDirective {

    constructor($timeout) {
        this.restrict = 'A';
        this.$timeout = $timeout;
    }

    link(scope, element, attribute, controller) {
        var headers = element.find('.poster-select th');
        var needsJudged = _.slice(headers, 0, 5);
        var alreadyJudged = _.slice(headers, 5);
        this.$timeout(() => {
            _.forEach(needsJudged, (header, key) => {
                if(header.offsetWidth > alreadyJudged[key].offsetWidth) {
                     alreadyJudged[key].style.width = header.offsetWidth+'px';
                }
            });
        }, 30);
    }

    static directiveFactory($timeout) {
        PosterSelectDirective.instance = new PosterSelectDirective($timeout);
        return PosterSelectDirective.instance;
    }

}

PosterSelectDirective.$inject = ['$timeout'];
app.directive('posterSelect', PosterSelectDirective.directiveFactory);