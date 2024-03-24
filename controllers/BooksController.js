//file system module
const fs = require('fs');
//requiere path
const path = require('path');

const BooksController = {
    index: (req, res) => {
        //read the file books.json from data directory and get the data
        let data = fs.readFileSync(path.join('data', 'books.json'), 'utf8');
        //parse the data to convert it into an array of objects
        let books = JSON.parse(data);
        //render the index view and pass the books data to the view
        res.render('index', { books, title: 'Bootcamp Book Store' });
    }
}

module.exports = BooksController;