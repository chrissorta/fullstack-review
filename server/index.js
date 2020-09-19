const express = require('express');
let app = express();
let axios = require('axios');
let db = require('../database');
// let db = require('../database/index.js')
let bodyParser = require('body-parser')


app.use(express.static(__dirname + '/../client/dist'));


app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  axios.get(`https://api.github.com/users/${req.body.term}/repos`)
    .then((results) => {
      console.log(results.data[0]);
      for (let i = 0; i < results.data.length; i++) {
        let repo = results.data[i];

        let repoObj = {
          repo_id: repo.id,
          name: repo.name,
          updated_At: repo.updated_at,
          description: repo.description,
          forks: repo.forks,
          url: repo.clone_url,
          owner_id: repo.owner.id
        }

        db.findOne(repo.id, (err,data) => {
          // console.log(data);
          if(!data) {
            db.save(repoObj);

          }

        })
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
  // console.log(req.body);
  db.find25((err, data) => {
    console.log(data);
    res.send(data);
  });

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

