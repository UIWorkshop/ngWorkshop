angular.module('workoutApp')
    .directive('chart', function () {
        return { 
            scope: {
                config: '=chart',
                width: '@width',
                height: '@height'
            },
            template: '<canvas></canvas>',
            link: function (scope, element, attr) {
                var canvas = element.find('canvas');
                canvas.attr({
                    width: scope.width,
                    height: scope.height
                });
                var chart = new Chart(canvas[0].getContext('2d'))
                var c;
                function updateChart (config) {
                    c && c.destroy();
                    c = chart[config.type](config.params);
                }
                updateChart(scope.config);
                scope.$watch('config', updateChart);
            },
        };
    });