import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      displayedRepos: []
    }

  }

  componentDidMount() {
    axios.get('/allRepos').then((repos) => {
      let results = []
      repos.data.map((repo) => {
        results.push(repo);
      })
      this.setState({ repos: results });
    })
      .then(() => {
        axios.get('/repos').then((repos) => {
          let displayedRepos = [];
          repos.data.map((repo) => {
            displayedRepos.push(repo);
          })
          this.setState({ displayedRepos: displayedRepos });
        })

      })
  }

  search(term) {

    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', { term })
      .then((results) => {
        console.log('success');
      }).then(() => {
        axios.get('/repos').then((repos) => {
          console.log(repos);
          let results = [];
          repos.data.map((repo) => {
            results.push(repo);
          })
          this.setState({ displayedRepos: results });
        })
      }).then(() => {
        axios.get('/allRepos').then((repos) => {
          let results = []
          repos.data.map((repo) => {
            results.push(repo);
          })
          this.setState({ repos: results });
        })
      })
      .catch((err) => {
        console.log('error');
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
      <h2> The top 25 github repos sorted by forks and recent updates</h2>
      {this.state.displayedRepos.map((repo) =>
        <div>
          <div><a href={repo.url} target="_blank">{repo.name}</a></div>
          {/* <div>{repo.url}</div> */}
        </div>
      )}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));