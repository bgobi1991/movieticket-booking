/**
 * Description: Angular init file to initialize the the angular module and common plugins
 */
var mainApp = angular.module('movieBookApp', ['ngResource', 'ngRoute']).run(
    ['$rootScope', '$location', '$window', '$http', '$compile',
        function($rootScope, $location, $window, $http, $compile) {
        	$.notifyDefaults({
                placement: {
                    from: "top"
                },
                animate:{
                    enter: "animated fadeInUp",
                    exit: "animated fadeOutDown"
                }
                //delay: 0
            });
        }
    ]
).config(function() {

});

