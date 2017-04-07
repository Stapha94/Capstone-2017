class ViewPosterPerformanceModalDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/modals/view-poster-performance-modal/view-poster-performance-modal.html';
        this.scope = {
            ctrl: '='
        };
    }

    static directiveFactory() {
        ViewPosterPerformanceModalDirective.instance = new ViewPosterPerformanceModalDirective();
        return ViewPosterPerformanceModalDirective.instance;
    }

}
app.directive('viewPosterPerformanceModal', ViewPosterPerformanceModalDirective.directiveFactory);