const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Artworks = require('./models/db').Artworks;

const index = require('./routes/index');
const users = require('./routes/users');
const cart = require('./routes/pages/cart');
const artworks = require('./routes/pages/artworks');
const artists = require('./routes/pages/artists');
const prints = require('./routes/categories/prints');

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/categories/'),
                  path.join(__dirname, 'views/pages/')]);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/cart', cart);
app.use('/prints/artworks', artworks);
app.use('/prints/artists', artists);
app.use('/prints', prints);

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
