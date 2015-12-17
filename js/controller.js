var workoutApp = angular.module('workoutApp');
workoutApp.controller('workoutsCtrl', ['$scope', '$log', '$routeParams', '$location', 'Workout', 'loadWorkouts', 
    function ($scope, $log, $routeParams, $location, Workout, loadWorkouts) {
    $log.info(Workout.a);

    $scope.list = [];
    loadWorkouts.load().then(function (data) {
        angular.forEach(data, function (workout) {
            $scope.list.push(new Workout(workout));
        });
    });


    $scope.editingWorkout;

    var charts = [{
        type: 'Radar',
        params: {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    },
    {
        type: 'Pie',
        params: [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ]
    },
    {
        type: 'Line',
        params: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }];

    function random () {
        $scope.chart = charts[(Math.random()+'').slice(4,6)%charts.length]
    }
    random();
    $scope.randomChart = random;

    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.list, function (item) {
            total += (item.time - 0)*1000;
        });

        return total;
    };

    $scope.new = function () {
        $scope.editingWorkout = new Workout($scope.list.length + 1);
    };

    $scope.save = function (workout) {
        workout.name.$pristine = false;
        if (workout.$invalid) {
            return;
        }
        $scope.list.push($scope.editingWorkout.clone());
        $scope.cancel(workout);
    };

    $scope.cancel = function (workout) {
        workout.name.$pristine = true;
        $scope.editingWorkout = null;
    };

    $scope.to = function (id) {
        $location.path('workout/' + id);
    }
}]);

workoutApp.controller('workoutCtrl', ['$scope', '$log', '$routeParams', 'loadWorkouts', 'loadMembers', 'Workout', 
    function ($scope, $log, $routeParams, loadWorkouts, loadMembers, Workout) {
    $log.info(Workout.a);

    $scope.id = $routeParams.workoutId || 0;
    $scope.workout = {};
    $scope.members = [];
    loadWorkouts.load().then(function (data) {
        angular.forEach(data, function (item) {
            if (item.id == $scope.id) {
                $scope.workout = new Workout(item);
            }
        });
        return loadMembers.load($scope.workout.name);
    }).then(function (data) {
        $scope.members = data;
    });
}]);