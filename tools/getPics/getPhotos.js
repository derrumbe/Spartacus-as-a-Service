var fs = require('fs'),
    request = require('request');

var temporal = require("temporal");






    var download = function (uri, filename, callback) {
      //  sleep(1000*i);
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };


// Loop every n milliseconds, executing a task each time
temporal.loop(10000, function() {

    console.log("Every 500ms...");








    download('https://thispersondoesnotexist.com/image', 'face'+this.called+'.jpg', function () {
        console.log('done');
    });


    // The number of times this loop has been executed:
    if (this.called==50)
        this.stop();


});
