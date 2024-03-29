var express = require('express');
var router = express.Router();

const AdminController = require('../controllers/AdminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const superAdminMiddleware = require('../middlewares/superAdminMiddleware');
const upload = require('../middlewares/multerBooks');

/* GET admin home view. */
router.get('/', adminMiddleware, AdminController.index);

//books routes
router.get('/books', adminMiddleware, AdminController.books);
router.get('/books/create', adminMiddleware, AdminController.createBook);
router.post('/books/create', adminMiddleware, upload.single('cover'), AdminController.storeBook);

// user routes
router.get('/users', adminMiddleware, AdminController.users);
router.get('/users/create', superAdminMiddleware, AdminController.createUser);
router.post('/users/create', superAdminMiddleware, AdminController.storeUser);

//genre routes
router.get('/genres', adminMiddleware, AdminController.genres);
router.get('/genres/create', adminMiddleware, AdminController.createGenre);
router.post('/genres/create', adminMiddleware, AdminController.storeGenre);

module.exports = router;