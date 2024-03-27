//file system module
const fs = require('fs');
//requiere path
const path = require('path');

const bcrypt = require('bcryptjs');

const AdminController = {
    index: (req, res) => {
        //render the index view and pass the books data to the view
        res.render('admin/admin', { title: 'Admin Page', user: req.session.user, active: 'admin' });
    },
    books: (req, res) => {
        //get the books.json file path
        const booksFilePath = path.join(__dirname, '../data/books.json');
        //read the books.json file
        let data = fs.readFileSync(path.join('data', 'books.json'), 'utf8');
        //parse the books data
        const books = JSON.parse(data);
        //render the books view and pass the books data to the view
        res.render('admin/admin-books', { title: 'Admin Books Page', books, active: 'books'});
    },
    
    createBook: (req, res) => {
        //render the create book view
        res.render('admin/create-book', { title: 'Create Book' });
    },
    
    storeBook: (req, res) => {
        //get the books.json file path
        const booksFilePath = path.join(__dirname, '../data/books.json');
        //read the books.json file
        let data = fs.readFileSync(path.join('data', 'books.json'), 'utf8');
        //parse the books data
        const books = JSON.parse(data);
        //get the book data from the form
        const book = {
            title : req.body.title,
            author : req.body.author,
            year : req.body.year,
            cover : req.file.filename,
            published : req.body.published,
            quantity : req.body.quantity,
            genre : req.body.genre,
            price : req.body.price,
            synopsis : req.body.synopsis,
        };

        //add the book to the books array
        books.push(book);
        //write the books data to the books.json file
        fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
        //redirect to the admin books page
        res.redirect('/admin/books');
    },

    users: (req, res) => {
        //get the users.json file path
        const usersFilePath = path.join(__dirname, '../data/users.json');
        //read the users.json file
        let data = fs.readFileSync(path.join('data', 'users.json'), 'utf8');
        //parse the users data
        const users = JSON.parse(data);
        //get the session user data
        //render the users view and pass the users data to the view
        res.render('admin/admin-users', { title: 'Admin Users Page', users, user : req.session.user, active: 'users'});
    },

    createUser: (req, res) => {
        //render the create user view
        res.render('admin/create-user', { title: 'Create User' });
    },

    storeUser: (req, res) => {
        //get the users.json file path
        const usersFilePath = path.join(__dirname, '../data/users.json');
        //read the users.json file
        let data = fs.readFileSync(path.join('data', 'users.json'), 'utf8');
        //parse the users data
        const users = JSON.parse(data);
        //get the user data from the form
        const user = {
            name : req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            rol : req.body.rol,
        };

        //add the user to the users array
        users.push(user);
        //write the users data to the users.json file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        //redirect to the admin users page
        res.redirect('/admin/users');
    }


}

module.exports = AdminController;