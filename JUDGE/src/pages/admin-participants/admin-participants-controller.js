app.controller('adminParticipantsController', ['$scope',
    function($scope) {
        // dashboardy stuff wilst goeth here
        var one = {id:1,name:"Bob",institute:"Marshall",project:"Common Cold",role:"BG",email:"Bob@Gmail.com",
            abstract:"Abstract",objective:"Objective",methods:"Methods",results:"Results",conclusion:"Conclusion"};
        var two = {id:2,name:"Steve",institute:"JCE", project:"Symptom Relief",role:"GE",email:"Steve@Marshall.edu",
            abstract:"Abstract",objective:"Help People",methods:"Methods",results:"Results",conclusion:"Conclusion"};
        var three = {id:3,name:"James",institute:"Marshall",project:"Research Topic",role:"SE",email:"James@JCE.com",
            abstract:"Abstract",objective:"Objective",methods:"Methods",results:"Results",conclusion:"Conclusion"};

        var data = [one,two,three];

        $scope.data = data;
    }
])