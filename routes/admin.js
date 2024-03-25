var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/multerBooks');

/* GET admin home view. */
router.get('/', adminMiddleware, AdminController.index);

router.get('/books', adminMiddleware, AdminController.books);

router.get('/books/create', adminMiddleware, AdminController.createBook);

router.post('/books/create', adminMiddleware, upload.single('cover'), AdminController.storeBook);

module.exports = router;