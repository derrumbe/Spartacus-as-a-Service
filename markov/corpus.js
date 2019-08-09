

module.exports = {




getInputText: function() {

// get text of pride and prejudice for use by markov chains
    var JFile=require("jfile");
    var myF = new JFile("./markov/prideprejudice.txt");

    //console.log(myF.text);
    var newtext=myF.text.replace(/\n/g,' ');

    var sentences = newtext.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);




//get text of republican
    var repF = new JFile("./markov/rep_platform.txt");
    var repT=repF.text.replace(/\n/g,' ');

    var repSent = repT.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);


    //get text of republican
    var demF = new JFile("./markov/dem_platform.txt");
    var demT=demF.text.replace(/\n/g,' ');

    var demSent = demT.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);


    console.log(sentences);
    console.log(demSent);

    return demSent;

    }

}

