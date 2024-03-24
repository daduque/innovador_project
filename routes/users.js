var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

/* GET users login view. */
router.get('/login', authMiddleware, UserController.login);

/* POST users login. */
router.post('/login', UserController.processLogin);

module.exports = router;
