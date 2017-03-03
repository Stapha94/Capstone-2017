app.controller('adminLoginController', ['$scope', '$state',
    function($scope, $state) {
        this.login = function() {
            $state.go('admin.dashboard');
        }
    }
])