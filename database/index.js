const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher3');
// let db = mongoose.connection;
// db.once('open', function() {
//   console.log('we are connected')
// });
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type:Number, unique: true},
  name: String,
  updated_At: Date,
  description: String,
  forks: Number,
  url: String,
  owner_id: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repo = new Repo(repoObj);
  repo.save((err, repo) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(repo);
    }
  })
}

let findOne = (repo_id, callback) => {
  let query = {'repo_id': repo_id};
  Repo.findOne({'repo_id': 'repo_id'}, (err, data) => {
    if(err) {
      console.log(repo_id);
      // console.log(err);
      callback(null, data);
    } else {
      console.log('This repo is already present');
    }

  })

}

let findAll = (callback) => {
  Repo.find({}, (err, data) => {
    callback(null, data);
  });

}

let find25 = (callback) => {
  console.log('hi');
  Repo.find({}, (err, data) => {
    callback(null, data);
  }).sort({'forks': -1, 'updated_At': -1} ).limit(25);

}

module.exports.save = save;
module.exports.find25 = find25;
module.exports.findOne = findOne;
module.exports.findAll = findAll;