describe('workouts service', function() {
    var loadWorkouts, httpBackend;
    beforeEach(function () {
        module('workoutApp');
        inject(['$httpBackend', 'loadWorkouts', function ($httpBackend, _loadWorkouts_) {
            httpBackend = $httpBackend;
            loadWorkouts = _loadWorkouts_;
            $httpBackend
                .when('GET', '/workouts.json')
                .respond({ id: 123});
        }]);
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should request workout', function () {
        httpBackend.expectGET('/workouts.json');
        var promise = loadWorkouts.load();
        var success = jasmine.createSpy('success');
        promise.then(success);
        httpBackend.flush();
        expect(success).toHaveBeenCalled();
    });
});

describe('workout service', function () {
    var Workout;
    beforeEach(function () {
        module('workoutApp');
        inject(['Workout', function (_Workout_) {
            Workout = _Workout_;
        }]);
    });

    it('should has some default properties', function () {
        var workout = new Workout();
        expect(workout.id).toEqual(0);
        expect(workout.name).toEqual('');
        expect(workout.time).toEqual(0);
        expect(workout.start).toEqual(jasmine.any(Date));
    });
});