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
            //var presenter = {firstName:'bob',lastName:'Greatest',suffix:'',email:'BobbyG@gmail.com',institutionId:1,roleId:1,abstractId:1,submissionDate:'10/10/2017',isRegistered:1};
            presenterService.create($scope.presenter)
                .then((presenter) => {
                    _.forEach($scope.keyParticipant, (keyParticipant) => {
                        keyParticipant.presenterId = presenter.presenterId;
                    });
                    keyParticipantService.create($scope.keyParticipant)
                        .then(() => {
                            posterAbstractService.create($scope.posterAbstract)
                                .then((posterAbstract) => {
                                    $scope.poster.presenterId = presenter.presenterId;
                                    $scope.poster.abstractId = posterAbstract.posterAbstractId;
                                    $scope.posterService.create($scope.poster);
                                })
                        });

                });
        };
        presenterService.get()
            .then(function(data) {
                $scope.data = data;
            });

    }
]);

