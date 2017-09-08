// server.js

// init project
var express = require('express');
var app = express();
var countTweets = require('./countTweets.js')

app.set('view engine', 'pug');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('index');
});


// app.get("/get-twitter-user-id?", function (request, response) {
//   response.send(getId(request.query.user));
// });

app.get("/count-tweets?", function (request, response) {
  countTweets(request.query.user, request.query.start, request.query.end, x => response.json(x))
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// function getId(username, callback) {
//   console.log("getting id_str for: " + username);
  
//   if (typeof callback === "function") callback(
//     client.get('users/search', {q: username}, (e,t,r) => { console.log(JSON.stringify(t[0].id_str)); return t[0].id_str})
//   );
  
//   else return client.get('users/search', {q: username}, (e,t,r) => { console.log(JSON.stringify(t[0].id_str)); return t[0].id_str});
// };