/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const { MarkovMachine } = require("./markov");


// arg is the first command line argument
const arg = process.argv[2];
// inputArg is the second command line argument
const inputArg = process.argv[3];



// cat webCat are now asynchronous functions that take a callback
function cat(path, cb) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path} :\n ${err}`);
        process.exit(1);
      }
      cb(null, data);
    });
  }
 
// webCat is now an asynchronous function that takes a callback
function webCat(url, cb) {
    axios.get(url)
      .then(response => cb(null, response.data))
      .catch(error => cb(error));
  }

// if arg is 'file', use cat to read inputArg and set output to write to a file
if (arg === 'file') {
    cat(inputArg, (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // create new MarkovMachine instance
        let mm = new MarkovMachine(data);
        // only write output to the console
        console.log(mm.makeText());
    });
// if arg is 'url', use webCat to read inputArg and set output to write to a file
} else if (arg === 'url') {
    webCat(inputArg, (err, data) => {
        if (err) {  
            console.log(err);
            process.exit(1);
        }
         // create new MarkovMachine instance
         let mm = new MarkovMachine(data);
         // only write output to the console
         console.log(mm.makeText());
    });
// if arg is anything else, use arg as the text and set output to console.log
} else {
    output = console.log(`${markov.makeText(arg)} is not a valid argument`);
}





