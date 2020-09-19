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
      repos: []
    }

  }

  componentDidMount() {
    axios.get('repos').then((repos) => {
      console.log(repos);
      repos.data.map((repo) => {
        this.state.repos.push(repo);
        this.setState({repos: this.state.repos});
      })
    })
  }

  search (term) {

    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos',{term})
    .then( (results) => {
      console.log('success');
    })
    .catch((err) => {
      console.log('error');
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      {this.state.repos.map((repo) =>
       <div>
        <div>{repo.name}</div>
        <div>{repo.url}</div>
        </div>
      )}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));