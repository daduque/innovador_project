//UserController with the login method and the processLogin method

//file system module
const fs = require('fs');
//requiere path
const path = require('path');

const UserController = {

    login: (req, res) => {
        res.render('login', { title: 'Login' });
    },

    processLogin: (req, res) => {
        //read the file users.json from data directory and get the data
        let data = fs.readFileSync(path.join('data', 'users.json'), 'utf8');
        //parse the data to convert it into an array of objects
        let users = JSON.parse(data);
        //get the email and password from the request body
        let email = req.body.email;
        let password = req.body.password;
        //find the user with the email and password
        let user = users.find(user => user.email === email && user.password === password);
        //if the user is found, save the user in the session and redirect to the home page
        if (user) {
            req.session.user = user;
            user.rol.includes('admin', 'editor') ? res.redirect('/admin') : res.redirect('/');
        } else {
            //if the user is not found, render the login view with an error message
            res.render('login', { title: 'Login', error: 'Invalid email or password' });
        }
    }
}

module.exports = UserController;