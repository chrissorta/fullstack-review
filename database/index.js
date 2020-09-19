const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// let db = mongoose.connection;
// db.once('open', function() {
//   console.log('we are connected')
// });
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
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
      console.log(repo);
    }
  })
}
let findOne = (repo_id, callback) => {

  Repo.find({ 'repo_id': 'repo_id' }, (err, data) => {
    if(err) {
      // console.log(data);
      callback(null, data);
    }

  })

}


let find25 = (callback) => {
  console.log('hi');
  Repo.find({}, (err, data) => {
    callback(null, data);
  }).sort({'updated_At': -1}).limit(25);

}

module.exports.save = save;
module.exports.find25 = find25;
module.exports.findOne = findOne;
