var workoutApp = angular.module('workoutApp');
workoutApp.service('loadWorkouts', ['$http', '$q', function ($http, $q) {
    return {
        load: function () {
        	var deferred = $q.defer();
            $http.get('/workouts.json').success(deferred.resolve);
            return deferred.promise;
        }
    };
}])
.factory('Workout', function () {
	var Workout = function (params) {
        this.id = params.id || 0;
        this.name = params.name || '';
        this.time = params.time || 0;
        this.start = params.start || new Date('2015-02-01');
	};
	Workout.prototype.clone = function () {
		return angular.copy(this);
	};
	return Workout;
});