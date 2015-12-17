describe('workout controller', function() {
    var scope;
    beforeEach(function () {
        module('workoutApp');
        inject(function($rootScope, $log, $routeParams, $controller) {
            scope = $rootScope.$new();
            $routeParams.workoutId = 123;
            $controller('workoutCtrl', {
                $scope: scope,
                $log: $log,
                $routeParams: $routeParams,
                loadWorkouts: {
                    load: function () { 
                        return { 
                            then: function () { 
                                return { then: angular.noop };
                            }
                        }; 
                    }
                },
                loadMembers: {load: angular.noop},
                Workout: {}
            });
        });
    });

    it('should has a id from route params', function() {
        expect(scope.id).toEqual(123);
    });
});