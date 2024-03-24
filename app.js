const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


// catch 404 and forward to 404 page
app.use((req, res, next) => {
  res.status(404).render('page404', { title: '404: Not Found' });
  next();
})

// error handler
app.use(function(err, req, res, next) {
  
  //log the error to the error_log.txt file
  const message = 'Error: ' + err.message;
  const dateTime = new Date().toLocaleString();
  fs.createWriteStream(path.join('logs', 'error_logs.txt'), { flags: 'a' });
  fs.appendFileSync(path.join('logs', 'error_logs.txt'), dateTime + ' - ' + message + '\n');

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
