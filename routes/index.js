let express = require('express');
let router = express.Router();

const booksRouter = require('./books');


//use the router object to define the routes for the application

//books routes
router.use('/', booksRouter);

//admin routes

//user routes
module.exports = router;
