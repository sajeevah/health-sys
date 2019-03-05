var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport	= require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
const config = require('./config/database');

var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var heartrates = require('./routes/heartrates');
var gpslocation = require('./routes/gpslocations');
var comments = require('./routes/comments');
var cors = require('cors');
var app = express();
var port = 3000;

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database '+config.database);
});

mongoose.connection.on('error', function(err) {
    console.log('Database error '+err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use('/events', events);
app.use('/heartrates', heartrates);
app.use('/gpslocation', gpslocation);
app.use('/comments', comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
