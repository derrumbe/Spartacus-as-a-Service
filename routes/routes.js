var Twitter = require('twitter');
// load the auth variables
var configAuth = require('../config/auth'); // use this one for testing

//var ml5 = require('../libraries/ml5.min.js');

var User = require('../libraries/user.js');




var ml_models = require('../config/ml5_models.js');
var models = ml_models();

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user,
            models: models
        });
    });

    // PROFILE SECTION =========================
    app.get('/createIdentities', function(req, res) {
        res.render('createIdentities.ejs');
    });


/*    app.get('/user', function (req, res) {
        console.log(faker.helpers.contextualCard());
        console.log(faker.helpers.contextualCard());
        res.json(User);
    });*/

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('loginMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

// =============================================================================
// Obfuscate (ALREADY LOGGED IN ) =============
// =============================================================================
// This route will obfuscate (add bogus content to whatever social media platform referenced)

    // local -----------------------------------
    app.get('/obfuscate/local', function(req, res) {
        res.redirect('/profile');
    });

    // facebook -------------------------------
    app.get('/obfuscate/facebook', function(req, res) {
        //insert life event changes for facebook here after testing
        // need to do a diff on current status and modify events
        res.redirect('/profile');
    });

    // twitter --------------------------------
    app.get('/obfuscate/twitter', function(req, res) {
        var user            = req.user;
        console.log("before tweet");
                    var twitterClient = new Twitter({
                        consumer_key: configAuth.twitterAuth.consumerKey,
                        consumer_secret: configAuth.twitterAuth.consumerSecret,
                        access_token_key: user.twitter.token,
                        access_token_secret: user.twitter.tokenSecret
                    });

                    console.log(twitterClient);
        //var yourSelect = document.getElementById( "model" );
        //alert( yourSelect.options[ yourSelect.selectedIndex ].value )

        console.log("tweet: "+req.query.tweet);

                   twitterClient.post('statuses/update', {status: req.query.tweet }, function(error, tweet, response) {
                        if (!error) {
                            console.log(tweet);
                        }
                        else {
                            console.log(error);
                        }
                    });
        console.log("after tweet");
        res.redirect('/profile');
    });

    // google ---------------------------------
    app.get('/obfuscate/google', function(req, res) {
        // insert URL redirection for search pollution here
        // should do via backend without user interaction
        //res.redirect('https://www.google.com/search?q=bananas');
        //open("https://www.google.com/search?q=bananas");
        open( 'https://www.google.com/search?q=bananas', function (err) {
            if ( err ) throw err;
        });
        res.redirect('/profile');
    });



};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}