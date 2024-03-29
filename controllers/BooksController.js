//file system module
const fs = require('fs');
//requiere path
const path = require('path');
//DB
const db = require('../database/models');

const BooksController = {
    index_old: (req, res) => {
        //read the file books.json from data directory and get the data
        let data = fs.readFileSync(path.join('data', 'books.json'), 'utf8');
        //parse the data to convert it into an array of objects
        let books = JSON.parse(data);
        //render the index view and pass the books data to the view
        res.render('index', { books, title: 'Bootcamp Book Store', user: req.session.user });
    },
    //render the books from the DB on the index, using the findAll() method
    index: (req, res) => {
        db.Book.findAll()
            .then(books => {
                res.render('index', { books, title: 'Bootcamp Book Store DB', user: req.session.user });
            })
            .catch(error => res.send(error));
    },

}

module.exports = BooksController;