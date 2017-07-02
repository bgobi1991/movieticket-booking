mainApp.directive('toggleInfo', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var movInfo =$(element[0].querySelector('.movie-info'));
            element.on('mouseenter', function() {
                movInfo.show();
            });

            element.on('mouseleave', function() {
                movInfo.hide();
            });
        }
    }
}]);
