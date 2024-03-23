//file system module
const fs = require('fs');
//requiere path
const path = require('path');

const BooksController = {
    index: (req, res) => {
        const message = 'ingreso en la ruta ' + req.url;
        const dateTime = new Date().toLocaleString();
        // console.log(dateTime + ' - ' + message);
        //write the log message to the general_logs.txt file
        fs.createWriteStream(path.join('logs', 'general_logs.txt'), { flags: 'a' });
        fs.appendFileSync(path.join('logs', 'general_logs.txt'), dateTime + ' - ' + message + '\n');
        //read the file books.json from data directory and get the data
        let data = fs.readFileSync(path.join('data', 'books.json'), 'utf8');
        //parse the data to convert it into an array of objects
        let books = JSON.parse(data);
        //render the index view and pass the books data to the view
        res.render('index', { books, title: 'Bootcamp Book Store' });
    }
}

module.exports = BooksController;