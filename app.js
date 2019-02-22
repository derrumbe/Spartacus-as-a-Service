
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var session      = require('express-session');
var flash    = require('connect-flash');


var configDB = require('./config/database.js');


var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');


var app = express();

require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({ secret: 'aubreymaturin',
resave: false,
saveUninitialized: false})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);



// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

};


module.exports = app;
