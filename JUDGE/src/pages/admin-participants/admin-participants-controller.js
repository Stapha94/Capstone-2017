app.controller('adminParticipantsController', ['$scope','$state','presenterService','posterAbstractService','posterService','keyParticipantService',
    function($scope, $state, presenterService,posterAbstractService,posterService, keyParticipantService) {
        // dashboardy stuff wilst goeth here
        var one = {id:1,name:"Bob",institute:"Marshall",project:"Common Cold",role:"BG",email:"Bob@Gmail.com",
            abstract:"Abstract",objective:"Objective",methods:"Methods",results:"Results",conclusion:"Conclusion"};
        var two = {id:2,name:"Steve",institute:"JCE", project:"Symptom Relief",role:"GE",email:"Steve@Marshall.edu",
            abstract:"Abstract",objective:"Help People",methods:"Methods",results:"Results",conclusion:"Conclusion"};
        var three = {id:3,name:"James",institute:"Marshall",project:"Research Topic",role:"SE",email:"James@JCE.com",
            abstract:"Abstract",objective:"Objective",methods:"Methods",results:"Results",conclusion:"Conclusion"};

        //var data2 = [one,two,three];

        //$scope.data = data;

        $scope.submit = function () {
            presenterService.create($scope.presenter)
               .then((presenter) => {/*
                    _.forEach($scope.keyParticipants, (keyParticipant) => {
                        keyParticipant.presenterId = presenter.presenterId;
                        keyParticipantService.create($scope.keyParticipant)
                    });*/
                            posterAbstractService.create($scope.posterAbstract)
                                .then((posterAbstract) => {
                                    $scope.poster.presenterId = presenter.presenterId;
                                    $scope.poster.abstractId = posterAbstract.posterAbstractId;
                                    $scope.poster.submissionDate = new Date();
                                    $scope.posterService.create($scope.poster);
                                })
                        });
        };
        presenterService.get()
            .then(function(data) {
                $scope.data = data;
            });

    }
]);

