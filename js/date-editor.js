angular.module('workoutApp')
    .directive('dateEditor', function () {
        return { 
            scope: {
                'dateEditor': '='
            },
            link: function (scope, element, attr) {
                scope.$watch('dateEditor', function (date) {
                    if (!angular.isDate(date)) {
                        return;
                    }
                    scope.year = date.getFullYear();
                    scope.month = date.getMonth() + 1;
                    scope.day = date.getDate();

                    scope.$watch('year', function (val) {
                        date.setFullYear(val);
                    }, true);
                    scope.$watch('month', function (val) {
                        date.setMonth(val - 1);
                    }, true);
                    scope.$watch('day', function (val) {
                        date.setDate(val);
                    }, true);
                });
            },
            templateUrl: 'tmpl/date-editor.html'
        };
    });