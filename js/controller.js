var workoutApp = angular.module('workoutApp', []);
workoutApp.controller('workoutCtrl', function ($scope) {
	$scope.list = [
        {name: '跑步', start: new Date('2015-01-01'), time: 0},
        {name: '游泳', start: new Date('2015-01-01'), time: 0},
        {name: '俯卧撑', start: new Date('2015-01-01'), time: 0},
        {name: '跳绳', start: new Date('2015-01-01'), time: 0},
        {name: '仰卧起坐', start: new Date('2015-01-01'), time: 0}
    ];

    $scope.editingWorkout;

    $scope.total = function () {
    	var total = 0;
    	angular.forEach($scope.list, function (item) {
    		total += (item.time - 0)*1000;
    	});

    	return total;
    };

    $scope.new = function () {
        $scope.editingWorkout = {
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
});