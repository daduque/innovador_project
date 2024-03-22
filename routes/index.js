let express = require('express');
let router = express.Router();

const booksRouter = require('./books');
const usersRouter = require('./routes/users');

//use the router object to define the routes for the application

//books routes
router.use('/', booksRouter);

//admin routes

//user routes
app.use('/users', usersRouter);

module.exports = router;
