const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');

/* GET home page. */
router.get('/', BooksController.index);

module.exports = router;
