
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var session      = require('express-session');
var flash    = require('connect-flash');



//import Markov from 'markov-strings'
//const Markov = require('markov-strings').default;
var markovStrings = require("markov-strings")

var bodyParser   = require('body-parser');
var session      = require('express-session');


var configDB = require('./config/database.js');

mongoose.connect(configDB.url, {useNewUrlParser: true}); // connect to our database



var app = express();

require('./config/passport')(passport); // pass passport for configuration
app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({ secret: 'aubreymaturin',
resave: false,
saveUninitialized: false})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/routes.js')(app, passport);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







module.exports = app;
