
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
let sample = require('lodash.sample');

app.get("/", function(request, response) {
  response.send("Ekip's Quote Server!  Ask me for '/', /Hello, /quotes, /quotes/random, /quotes/search/term, /quotes/search/word and /quotes/search/author");
});

//START OF YOUR CODE...

app.get("/Hello", function(request, response) {
  response.send("Hi there, for a new quote this is the app that you can use.");
});

app.get("/quotes", function(request, response) {
  response.sendFile(__dirname + "/quotes.json");
});

app.get("/quotes/random", function(request, response) {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  response.send(randomQuote);
});

app.get('/quotes/search/term', function (req, res){
  let term = req.query.term;
  res.send(`The search term you entered is: ${term}`);
})

app.get('/quotes/search/word', function (req, res){
  let word = req.query.word; 
  let findQuotesMatching = (quotes, word)=>{
    return quotes.filter((q) => (q.quote.toLowerCase().includes(word)));
  }
  res.send(findQuotesMatching(quotes, word));
})

app.get('/quotes/search/author', function (req, res){
  let author = req.query.author;
  console.log(author);
  let findAuthorMatching = (quotes, author)=>{
    return quotes.filter((a)=>(a.author.toLowerCase().includes(author)));
  }
  res.send(findAuthorMatching(quotes, author));
})

app.get('/quotes/sample', function (req, res){
  let randomQuote = sample(quotes);
  res.send(randomQuote);
})
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
app.listen(3003, function () {
  console.log("Server is listening on port 3003. Ready to accept requests!");
});



