mainApp.factory('movieStubFactory', function ($resource) {
    return $resource('/movies');
});
mainApp.factory('seatsFactory', function ($resource) {
    return $resource('/seats', {}, {'query':  {isObject:true}});
});
mainApp.factory('movieFactory', function ($resource) {
    return {
    	showNotification: function(params) {
            var msg = params.msg;
            var type = params.hasOwnProperty('type') ? params.type : 'info';
            $.notify({message: "</br>"+msg, title: '<strong>'+params.title+'</strong>'}, {type: type, 'delay': 10000});
        },
        bookings: function(params) {
        	return $resource('/bookings', {}, {'query':  {isObject:true}});
        }
    }
});
