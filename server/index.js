const express = require('express');
let app = express();
let axios = require('axios');
// let db = require('../database/index.js')
let bodyParser = require('body-parser')


app.use(express.static(__dirname + '/../client/dist'));


app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body);
  axios.get(`https://api.github.com/users/${req.body.term}/repos`)
    .then((results) => {
      for (let i = 0; i < results.data.length; i++) {
        console.log(results.data[i].name);

      }
      console.log('Success in server');
      res.status(200).send();
    })
    .catch((results) => {
      console.log(results);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

