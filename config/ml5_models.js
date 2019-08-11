// config/ml5_models


var glob = require("glob");
var models = new Array();

//go get the available models from the current directory
var options = {

    cwd: './public/CharRNN/models/'

};

//models=glob.sync("*", options);

module.exports = function return_models() {

   return(glob.sync("*", options));

};