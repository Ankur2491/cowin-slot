import React from 'react';
import './App.css';
import Main from './components/Main'
class App extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Cowin-Slots-Finder</a>
            <a class="nav-link" href="https://github.com/Ankur2491">GitHub</a>
          </div>
        </nav>
        <Main />
      </div>
    )
  }
}
export default App