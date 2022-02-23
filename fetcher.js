//reqs at the top
const request = require('request');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log("Minumum of 2 arguments required");
  process.exit(1);
}

request(args[0], (error, response, body) => {
  if (!response || response.statusCode !== 200) {
    console.log(error);
    process.exit(1);
  }
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  
  const length = response.headers['content-length'];//value at the key
  const file = args[1];
  const directory = path.dirname(file);
  fs.access(directory, err => {
    if (err) {//if it does not exist
      console.log(err);
      process.exit(1);
    }
    fs.writeFile(file, body, err => {//if exists then...
      if (err) {//if file write could not complete
        console.error(err);
        process.exit(1);//exit, there is an issue
      }
      console.log(`Downloaded and saved ${length} bytes to ${file}`);
    });
  });
});

