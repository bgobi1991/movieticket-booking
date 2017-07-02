mainApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.ejs',
            controller: 'movieCtrl'
        }).when('/booktickets/:id/:showtime', {
            templateUrl: 'views/booktickets.ejs',
            controller: 'bookTktCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
});
