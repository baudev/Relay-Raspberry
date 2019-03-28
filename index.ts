import {Log} from "./src/LogUtil";

const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const _ = require('lodash');

const app = express();

// We import users data
let users = fs.readFileSync('./users.json');
users = JSON.parse(users);

const appPath = path.join(__dirname);

//Server configuration
app.set('view engine', 'ejs');
let viewPath = path.join(appPath, 'views');
let staticFilesPath = path.join(appPath, 'views');
app.set('views', viewPath);

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

// Session-persisted message middleware
app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = 'invalid';
    if (msg) res.locals.message = msg;
    next();
});

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access refused!';
        res.redirect('/login');
    }
}

/**
 * API
 */
app.get('/', function (req, res) {
    res.redirect('/login');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    let isCorrectAuth: boolean = false;
    let userConnected = null;
    _.forEach(users, (user) => {
        if(user.username == req.body.username) {
            if(user.password == req.body.password) {
                isCorrectAuth = true;
                userConnected = user;
                return false;
            }
        }
    });
        if (userConnected) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function () {
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = userConnected;
                req.session.success = 'Authenticated as ' + userConnected.username;
                res.redirect('/restricted');
            });
        } else {
            req.session.error = true;
            res.redirect('/login');
        }
});

app.get('/logout', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.get('/restricted', restrict, function (req, res) {
    res.render('panel.ejs')
});

app.use('/src', express.static(staticFilesPath));  // allow /src directory to be public

app.get('/enable', restrict, function (req, res) {

});

//start server
app.listen(3000);
Log.info('Express started on port 3000');
