app.controller('registrationController', ['$scope', 'presenterService',
    function($scope, presenterService) {
        $scope.presenter = {};

        $scope.create = function() {
            $scope.presenter.abstractId = 2;
            $scope.presenter.isRegistered = 1;

            presenterService.create($scope.presenter)
            .then(function(response) {
                return response;
            })
        }
    }
])