app.controller('adminParticipantsController', ['$scope','$state','presenterService','posterAbstractService','posterService',
    function($scope, $state, presenterService,posterAbstractService,posterService) {
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
            presenterService.createPresenter($scope.presenter)
                .then(function(response) {
                    return response;
                });
            posterAbstractService.createAbstract($scope.abstract)
                .then(function(response) {
                    return response;
                });
            var poster = {
                category: '1',
                presenterId: "Hoverman@marshall.edu",
                posterAbstractId: 'Cheese',
                summitId: 0,
                date: '10/10/2017'
            };
            posterService.createPoster(poster)
                .then(function(response) {
                    return response;
                })

        };
        presenterService.getPresenters()
            .then(function(data) {
                $scope.data = data;
            });

    }
]);

