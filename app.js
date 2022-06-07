var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const connectDB = require('./configs/database.config');
const session = require('express-session');

var authRoute = require('./routes/auth.route');
var newsRoute = require('./routes/news.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "NodeJS basic" }));

connectDB();

app.use('/', authRoute);

app.use((req, res, next) => {
  if (req.session.email) {
    res.locals.email = req.session.email;
    next();
  } else {
    res.render('./login', { errorMessage: null });
  }
});

app.use('/news', newsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
