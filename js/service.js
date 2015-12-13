var workoutApp = angular.module('workoutApp');
workoutApp.factory('workout', ['$http', function ($http) {
    return {
        load: function (callback) {
            $http.get('/workouts.json').success(callback);
        }
    };
}]);