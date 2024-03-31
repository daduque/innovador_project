//UserController with the login method and the processLogin method

//file system module
const fs = require('fs');
//requiere path
const path = require('path');
//bcrypt module
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
//user db model
const db = require('../database/models');

const UserController = {

    login: (req, res) => {
        res.render('login', { title: 'Login' });
    },


    processLogin: (req, res) => {
        let errors = validationResult(req);

        console.log(errors);
        if (!errors.isEmpty()) {
            return res.render('login', { title: 'Login', errors: errors.errors, old: req.body});
        }else{
            //get the email and password from the request body
            let email = req.body.email;
            let password = req.body.password;
            //find the user with the email
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                //if the user is found, check the password with bcrypt
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password);
                    //if checkPassword is true, save the user in the session and redirect to the home page or admin page
                    if (checkPassword) {
                        req.session.user = user;
                        ['admin', 'editor'].includes(user.role)? res.redirect('/admin') : res.redirect('/');
                    } else {
                        //if the user is not found, render the login view with an error message
                        res.render('login', { title: 'Login', error: 'Invalid email or password' });
                    }
                } else {
                    //if the user is not found, render the login view with an error message
                    res.render('login', { title: 'Login', error: 'Invalid email or password' });
                }
            });
        }
    },

    logout: (req, res) => {
        //destroy the session and redirect to the home page
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = UserController;