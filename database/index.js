const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// let db = mongoose.connection;
// db.once('open', function() {
//   console.log('we are connected')
// });
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  username: String,
  updated_At: Date,
  description: String,
  hasWikis: Boolean,
  forks: Number,
  owner_id: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;