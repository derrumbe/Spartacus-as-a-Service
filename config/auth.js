// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '601139403643096', // your App ID
        'clientSecret'  : '91e614b3523e558e5e9b219f75f0ca15', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.8/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'FZ0gPKDIGFvcGY1SNgRfNGdzE',
        'consumerSecret'    : 'JaslAhQiGCEafd3PXycFurTD4bMbC3U28xUq9RMDZkiRWJIu0C',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '103876422101-g1b6h3kg3scc9k1q3uhfgm3fpld54je2.apps.googleusercontent.com',
        'clientSecret'  : 'vghjS_0jkv-vwx_hCKk1tOiM',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};