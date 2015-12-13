var workoutApp = angular.module('workoutApp');
workoutApp.controller('workoutCtrl', ['$scope', '$routeParams', 'workout', function ($scope, $routeParams, workoutService) {
    $scope.list = [];
    workoutService.load(function (data) {
        $scope.list = data;
    });

    $scope.editingWorkout;
    $scope.currentWorkout = function () {
        var currentWorkout;
        if ($routeParams.workoutId > 0) {
            angular.forEach($scope.list, function (item) {
                if (item.id == $routeParams.workoutId) {
                    currentWorkout = item;
                }
            });
        }
        return currentWorkout;
    };


    $scope.total = function () {
    	var total = 0;
    	angular.forEach($scope.list, function (item) {
    		total += (item.time - 0)*1000;
    	});

    	return total;
    };

    $scope.new = function () {
        $scope.editingWorkout = {
            id: $scope.list.length + 1,
            name: '',
            time: 0,
            start: new Date('2015-02-01')
        };
    };

    $scope.save = function (workout) {
        workout.name.$pristine = false;
        if (workout.$invalid) {
            return;
        }
        $scope.list.push(angular.copy($scope.editingWorkout));
        $scope.cancel(workout);
    };

    $scope.cancel = function (workout) {
        workout.name.$pristine = true;
        $scope.editingWorkout = null;
    };
}]);