app.controller('adminReportingController', ['$scope',
    function($scope) {
        // dashboardy stuff wilst goeth here
        var one = {id:1,name:"Bob",score:100,project:"Common Cold",category:"Marshall"};
        var two = {id:2,name:"Steve",score:95, project:"Symptom Relief",category:"JCE"};
        var three = {id:3,name:"James",score:85,project:"Research Topic",category:"Marshall"};

        var data = [one,two,three];

        $scope.data = data;

    }
])