var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const formData = require("express-form-data");
var cors = require('cors');


/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/
var app = express();



const options = {
  /*
  uploadDir: os.tmpdir(),
  autoClean: true
  */
}
app.use(cors())
app.use(formData.parse(options))
// clear from the request and delete all empty files (size == 0)
app.use(formData.format())
// change file objects to stream.Readable
app.use(formData.stream())
// union body and files
app.use(formData.union())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

var bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config')(app);
require('./db/repository')(app, mongoose);
require('./routes')(app, mongoose);
require('./model')(app, mongoose);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
