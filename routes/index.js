let express = require('express');
let router = express.Router();

const booksRouter = require('./books');
const usersRouter = require('./users');
const adminRouter = require('./admin');

//use the router object to define the routes for the application

//books routes
router.use('/', booksRouter);

//admin routes
router.use('/admin', adminRouter);

//user routes
router.use('/user', usersRouter);


module.exports = router;
