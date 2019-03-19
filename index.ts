const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
import {Relay} from "./src/Entity/Relay";

// We import users data
let users = fs.readFileSync('./users.json');
users = JSON.parse(users);

// We create the relay entity
let relay : Relay = new Relay(4);

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        console.log('Inside local strategy callback')
        // here is where you make a call to the database
        // to find the user based on their username or email address
        // for now, we'll just pretend we found that it was users[0]
        const user = users[0]
        if(email === user.email && password === user.password) {
            console.log('Local strategy returned true')
            return done(null, user)
        }
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// create the homepage route at '/'
app.get('/', (req, res) => {
    console.log('Inside the homepage callback')
    console.log(req.sessionID)
    res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
    console.log('Inside GET /login callback')
    console.log(req.sessionID)
    res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);
})

app.get('/panel', (req, res) => {
    console.log('Inside GET /panel callback')
    if(req.isAuthenticated()) {
        res.send('Panel template')
    } else {
        res.redirect('/')
    }
})

app.get('/relay', (req, res) => {
    console.log('Inside GET /relay callback')
    if(req.isAuthenticated()) {
        // We return the current state of the relay
        res.send(`Relay state: ${relay.getState()}`)
    } else {
        res.redirect('/')
    }
})

app.post('/set_relay', async (req, res) => {
    console.log('Inside GET /relay callback')
    if (req.isAuthenticated()) {
        // We update the state of the Relay
        if (req.body.state == 1) {
            relay.enable()
                .then(res.send('OK'))
                .catch(res.send('Error'))
        } else if(req.body.state == 0) {
            relay.disable()
                .then(res.send('OK'))
                .catch(res.send('Error'))
        } else {
            res.send('Error')
        }
    } else {
        res.redirect('/')
    }
})

// tell the server what port to listen on
app.listen(3000, () => {
    console.log('Listening on localhost:3000')
})