var workoutApp = angular.module('workoutApp', ['ngRoute']);
workoutApp.config(function ($routeProvider, $provide) {
    $provide.decorator('Workout', function ($delegate) {
        $delegate.a = null;
        return $delegate;
    });
    $routeProvider
        .when('/index', {
            controller: 'workoutsCtrl',
            templateUrl: 'tmpl/workouts.html',
            resolve: {
                xxx: function () {
                    $provide.decorator('Workout', function ($delegate) {
                        $delegate.a = 1;
                        return $delegate;
                    });
                    return 'list';
                }
            }
        })
        .when('/workout/:workoutId', {
            controller: 'workoutCtrl',
            templateUrl: 'tmpl/view_workout.html',
            resolve: {
                xxx: function () {
                    $provide.decorator('Workout', function ($delegate) {
                        $delegate.a = 2;
                        return $delegate;
                    });
                    return 'detail';
                }
            }
        })
        .otherwise({ redirectTo: '/index' });
});