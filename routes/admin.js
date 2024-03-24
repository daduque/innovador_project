var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

/* GET users login view. */
router.get('/', adminMiddleware, AdminController.index);

module.exports = router;