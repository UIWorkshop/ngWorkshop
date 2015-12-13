var workoutApp = angular.module('workoutApp', ['ngRoute']);
workoutApp.config(function ($routeProvider) {
    $routeProvider
        .when('/index', {
            controller: 'workoutCtrl',
            templateUrl: 'tmpl/workouts.html'
        })
        .when('/workout/:workoutId', {
            controller: 'workoutCtrl',
            templateUrl: 'tmpl/view_workout.html'
        })
        .otherwise({ redirectTo: 'index' });
});