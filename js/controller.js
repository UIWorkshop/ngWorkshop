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