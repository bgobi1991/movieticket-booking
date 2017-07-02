mainApp.controller("movieCtrl", function($scope, movieStubFactory, $location) {

    $scope.headerUrl = "views/header.ejs";

    $scope.movies = movieStubFactory.query();

    $scope.currMovie = null;

    $scope.getMovieById = function(id) {
        var movies = $scope.movies;
        for (var i = 0; i < movies.length; i++) {
            var movie = $scope.movies[i];
            if (movie.id == id) {
                $scope.currMovie = movie;
            }
        }
    };

    $scope.back = function() {
        window.history.back();
    };
});


mainApp.controller("bookTktCtrl", function($scope, $http, $location, $routeParams, seatsFactory, $resource, movieFactory, $route) {

    $scope.seats = seatsFactory.query();


    $scope.getMovieById($routeParams.id);
    $scope.onlyNumbers = /^\d+$/;
    $scope.formData = {};
    $scope.formData.movie_id = $routeParams.id;
    $scope.formData[$routeParams.showtime] = {};
    //$scope.formData.movie_id[$routeParams.showtime] = {};
    $scope.formData.date = new Date();

    $scope.processForm = function() {
        var seatRes = JSON.parse(angular.toJson($scope.newSelectedSeats));
        for(var i in seatRes) {
            var arr = [];
            // arr = arr.map(function(val){
            //     return ++val;
            // });
            //console.log(seatRes[i]);
            for(var j=0;j<seatRes[i].length;j++) {
                arr[seatRes[i][j]] = seatRes[i][j]+1;
            }
            seatRes[i] = arr;
            //seatRes[i] = arr;
        }
        //console.log(seatRes);
        //return;

        $scope.formData[$routeParams.showtime] = seatRes;
        $scope.formData.qty = $scope.no_of_tkt;
        $http({
                method: 'POST',
                url: '/book',
                data: $scope.formData, // pass in data as strings
                headers: {
                    'Content-Type': 'application/json'
                } // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
                var params = {
                    'title': "Booking",
                    "msg": data.msg,
                    "type": data.type
                };
                movieFactory.showNotification(params);
                window.history.back();
                 //location.reload(); 
            });
    };

    $scope.selectedSeatsData = seatsFactory.query();

    $scope.selectedSize = 0;
    $scope.no_of_tkt = 0;
    $scope.selectSeat = function(row, idx) {
        if ($scope.no_of_tkt == 0) {
            var params = {
                'title': "Seat Selection",
                'msg': "Please enter the no.of ticket",
                'type': 'warning'
            };
            movieFactory.showNotification(params);
            return;
        }
        var pos = $scope.newSelectedSeats[row].indexOf(idx);
        if (pos == -1) {
            if ($scope.no_of_tkt <= $scope.selectedSize) {
                var params = {
                    'title': "Seat Selection",
                    'msg': "You can select only " + $scope.no_of_tkt + " tickets",
                    'type': 'warning'
                };
                movieFactory.showNotification(params);
                return;
            }
            $scope.newSelectedSeats[row].push(idx);
            $scope.selectedSize++;
        } else {
            $scope.newSelectedSeats[row].splice(pos, 1);
            $scope.selectedSize--;
        }

    }
    $scope.setSelectedRows = function() {
        $scope.selectedSeatsData.$promise.then(function(result) {
            $scope.newSelectedSeats = {};
            $scope.oldSelectedSeats = {};
            
            for (var i in result) {
                $scope.newSelectedSeats[i] = [];
            }
        });
    }
    $scope.resetSelectedRows = function() {
        $("div .seatI").removeClass("sel");
        $scope.selectedSize = 0;
        $scope.setSelectedRows();
        $scope.no_of_tkt = 1;
    }
    $scope.setSelectedRows();
    $scope.no_of_tkt = 1;
    $scope.number = [];
    $scope.number.push(1,2,3,4,5,6,7,8,9,10);
    
    $scope.oldSelectedSeatsData = movieFactory.bookings().query({"movie_id": $routeParams.id});
    $scope.oldSelectedSeatsData.$promise.then(function(result) {
        console.log(result);
        for (var i in result[$routeParams.showtime]) {
            $scope.oldSelectedSeats[i] = result[$routeParams.showtime][i];
        }
    });
    

});