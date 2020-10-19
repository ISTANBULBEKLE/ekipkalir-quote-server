
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function(request, response) {
  response.send("Ekip's Quote Server!  Ask me for '/', /Hello, /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/Hello", function(request, response) {
  response.send("Hi there, for a new quote this is the app that you can use.");
});

app.get("/quotes", function(request, response) {
  response.sendFile(__dirname + "/quotes.json");
});

app.get("/search", function(request, response) {
  let life = request.query.life;
  response.send(`The search for life quotes ${life}`);
});

app.get("/quotes/random", function(request, response) {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  response.send(randomQuote);
});

app.get("/quotes/search", function(request, response) {
  let word = request.query.word;  
  response.send(`You said you want to search for: ${word}`);
});

app.get ('/quotes/:theValue', function (request, response){
  console.log(request.params);
  response.send(request.params.theValue.toUpperCase())
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});



