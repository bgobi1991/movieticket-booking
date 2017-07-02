var express = require("express"),
	routes = require('./routes/index'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = process.env.PORT || 2595;

var app = express();

app.set('trust proxy', 1);

app.use(compress());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'data')));

app.use('/', routes);

process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    //process.exit(1);
});


app.listen(port);
console.log('Express server running at http://localhost:' + port);

module.exports = app;