var express = require('express'),
    router = express.Router(),
    fs = require("fs");


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/movies', function (req, res) {
    var movies = require('../data/movies.json');
    res.json(movies);
});
router.get('/seats', function (req, res) {
    var seats = require('../data/seats.json');
    res.json(seats);
});

router.get('/bookings', function (req, res, next) {
   
    if (fs.existsSync('./data/bookings/'+req.query.movie_id+".json")) {
        var bookings = requireUncached('../data/bookings/'+req.query.movie_id+".json");
        res.json(bookings);
    } else {
        res.end(JSON.stringify({}));
    }

    
});

router.post('/book', function (req, res) {

    fs.writeFile("data/bookings/"+req.body.movie_id+".json", JSON.stringify(req.body) , function(err, data) {
        if(err) {
            res.end(JSON.stringify({"status": 0, "msg": "Failed to booking", "type": "error"}));
        }
        res.end(JSON.stringify({"status": 1, "msg": "Booking successfully", "type": "success"}));
    });
}); 

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

module.exports = router;
