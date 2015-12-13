describe('workout controller', function() {
    var $scope;
    beforeEach(function () {
        module('workoutApp');
        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('workoutCtrl', {
                $scope: $scope, 
                workout: {load: angular.noop}
            });
        });
    });

    it('contains spec with an expectation', function() {
        expect(angular.isArray($scope.list)).toBeTruthy();
    });
});