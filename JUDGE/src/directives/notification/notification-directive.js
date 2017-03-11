app.directive('notification', function() {
    return {
        restrict: 'E',
        scope: {
            message: '=',
            type: '='
        },
        link: function(scope) {
            if(scope.type === 'error') {
                Materialize.toast(scope.message, 4000, 'error');
            }
            scope.message = '';
            scope.type = '';
        }
    };
});