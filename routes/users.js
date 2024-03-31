var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const userLoginValidator = require('../middlewares/userLoginValidator');

/* GET users login view. */
router.get('/login', authMiddleware, UserController.login);

/* POST users login. */
router.post('/login', userLoginValidator, UserController.processLogin);

//logout
router.get('/logout', UserController.logout);

module.exports = router;