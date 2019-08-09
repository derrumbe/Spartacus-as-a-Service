
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var session      = require('express-session');
var flash    = require('connect-flash');
global.faker = require('faker');
const open = require('open');
console.log("here");

//import Markov from 'markov-strings'
//const Markov = require('markov-strings').default;
//var Markov = require("markov-strings")

//var bodyParser   = require('body-parser');
var session      = require('express-session');

//var corpus = require ("./markov/corpus.js");
// Build the Markov generator
//const markov = new Markov(corpus.getInputText(), { stateSize: 3 });
//markov.buildCorpus()

//console.log(corpus.getInputText());


//const options = {
 //   maxTries: 1000, // Give up if I don't have a sentence after 20 tries (default is 10)
  //  filter: (result) => {
   // return
        //result.string.split(' ').length >= 5 // At least 5 words
        //result.string.endsWith('.')             // End sentences with a dot.
//}
//}

// Generate a sentence
//const result = markov.generate();
//console.log(markov.generate());
//console.log(markov.generate());
//console.log(markov.generate());
//console.log(markov.generate());

console.log("here");



var ml_models = require('./config/ml5_models.js');
var models = ml_models();

//show avail models in console
console.log(models);

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


var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties


console.log(randomName,randomEmail,randomCard);




module.exports = app;
