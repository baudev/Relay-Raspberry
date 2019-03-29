import Log from "./src/LogUtil";
import Relay from "./src/Entity/Relay";


const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const _ = require('lodash');

// We import users data
let users = fs.readFileSync('./users.json');

users = JSON.parse(users);
// We import settings data
let settings = fs.readFileSync('./settings.json');
settings = JSON.parse(settings);

// We instantiate server and the Relay
const relay = new Relay(settings.GPIONumber);
const app = express();

// We set the logs mode
Log.enableDebugMode(settings.DebugMode);

//Server configuration
app.set('view engine', 'ejs');
const appPath = path.join(__dirname);
let viewPath = path.join(appPath, 'views');
app.set('views', viewPath);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'secret_value'
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
        Log.info('Access refused!');
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
    Log.info('Access to /login');
    res.render('login');
});

app.post('/login', function (req, res) {
    Log.info('Connection to /login');
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
    Log.debug(userConnected);
    if (userConnected) {
        Log.info('Connection to /login succeed.');
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function () {
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = userConnected;
            req.session.success = 'Authenticated as ' + userConnected.username;
            res.redirect('/panel');
        });
    } else {
        Log.info('Connection to /login failed.');
        req.session.error = true;
        res.redirect('/login');
    }
});

app.get('/logout', function (req, res) {
    Log.info('User logout.');
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.get('/panel', restrict, async function (req, res) {
    Log.info('Access to panel.');
    const state: number = await relay.getState();
    Log.debug('Panel state: ' + state);
    res.render('panel.ejs', {state : state, panelName: settings.PanelName, relayName: settings.RelayName, disableAfterXSeconds: relay.disableAfterXSeconds})
});

app.get('/change_state', restrict, async function (req, res) {
    const state = req.query.value;
    Log.debug('Order state value: ' + state);
    if (state == 'true') {
        Log.info('Relay enable order');
        await relay.enable();
    } else {
        Log.info('Relay disable order');
        await relay.disable();
    }
    res.redirect('/panel')
});

//start server
app.listen(3000);
Log.info('Server started on port 3000');
