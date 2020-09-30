const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const languagesRouter = require('./routes/languages');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();


// const {getGameWords, getMockGameWords} = require('./helpers/apiHelpers');

// console.log(getMockGameWords(3,5));
// const async words = await getGameWords(2,8);
// console.log(words);


// DB and helpers
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['randomstring', 'anotherrandomstring'],
}));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/languages', languagesRouter(dbHelpers));
app.use('/register', registerRouter(dbHelpers));
app.use('/login', loginRouter(dbHelpers));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
