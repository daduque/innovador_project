//file system module
const fs = require('fs');
//requiere path
const path = require('path');

const bcrypt = require('bcryptjs');

//db models
const db = require('../database/models');

const AdminController = {
    index: (req, res) => {
        //render the index view and pass the books data to the view
        res.render('admin/admin', { title: 'Admin Page', user: req.session.user, active: 'admin' });
    },

    books: (req, res) => {
        //find all books
        db.Book.findAll( { include: ['genre'] })
        .then(books => {
            //render the books view and pass the books data to the view
            res.render('admin/admin-books', { title: 'Admin Books Page', books, user : req.session.user, active: 'books'});
        });
    },
    
    createBook: (req, res) => {
        //find all genres and send them to the view
        db.Genre.findAll()
        .then(genres => {
            //render the create book view
            res.render('admin/create-book', { title: 'Create Book', genres });
        });
    },
    
    storeBook: (req, res) => {
        //Save book to DB model Book
        db.Book.create({
            title: req.body.title,
            author : req.body.author,
            year : req.body.year,
            cover : req.file.filename,
            publisher : req.body.publisher,
            quantity : req.body.quantity,
            genre_id : req.body.genre,
            price : req.body.price,
            synopsis : req.body.synopsis,
        })
        .then(book => {
            //redirect to the admin books page
            res.redirect('/admin/books');
        })
        .catch(error => {
            console.log(error);
        });
    },

    //from database - model User
    users: (req, res) => {
        //find all users
        db.User.findAll()
        .then(users => {
            console.log(users.dataValues);
            //render the users view and pass the users data to the view
            res.render('admin/admin-users', { title: 'Admin Users Page', users, user : req.session.user, active: 'users'});
        });
    },

    createUser: (req, res) => {
        //render the create user view
        res.render('admin/create-user', { title: 'Create User' });
    },

    storeUser: (req, res) => {
    //Save user to DB model User with encrypted password
        db.User.create({
            name: req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            role : req.body.role,
        })
        .then(user => {
            //redirect to the admin users page
            res.redirect('/admin/users');
        })
        .catch(error => {
            console.log(error);
        });
    },

    genres: (req, res) => {
        //find all genres
        db.Genre.findAll()
        .then(genres => {
            //render the genres view and pass the genres data to the view
            res.render('admin/admin-genres', { title: 'Admin Genres Page', genres, user : req.session.user, active: 'genres'});
        });
    },

    createGenre: (req, res) => {
        //render the create genre view
        res.render('admin/create-genre', { title: 'Create Genre' });
    },

    storeGenre: (req, res) => {
        //Save genre to DB model Genre
        db.Genre.create({
            genre: req.body.name,
        })
        .then(genre => {
            //redirect to the admin genres page
            res.redirect('/admin/genres');
        })
        .catch(error => {
            console.log(error);
        });
    },


}

module.exports = AdminController;