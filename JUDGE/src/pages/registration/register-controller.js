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

        $scope.addParticipant = function() {



        }

        //var one = {first:"Paul", last:"Fox", department:"School of Medicine"};
        //var two = {first:"Gabe", last:"Hobermann", department:"School of Medicine"};
        //var three = {first:"Mark", last:"Adkins", department:"School of Pharmacy"};

        //var data = {one, two, three};

        $scope.data = data;
    }

])