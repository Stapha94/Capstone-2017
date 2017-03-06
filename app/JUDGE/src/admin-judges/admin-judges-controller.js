app.controller('adminJudgesController', ['$scope',
    function($scope) {
        // dashboardy stuff wilst goeth here
        var one = {id:1,name:"Bob",score:100,project:"Common Cold",category:"Marshall",active: true};
        var two = {id:2,name:"Steve",score:95, project:"Symptom Relief",category:"JCE",active: false};
        var three = {id:3,name:"James",score:85,project:"Research Topic",category:"Marshall",active: true};
        var four = {id:4,name:"Mark",score:85,project:"Soda and Health",category:"JCE",active: true};

        var data = [one,two,three,four];

        $scope.data = data;
    }
])