import React, { Component } from 'react';
import WelcomePage from './components/welcome-page';
import './App.css';

class App extends Component {

  render() {
    return(
      <div className="App">
        <center>
          <WelcomePage history={this.props.history}/>
        </center>
      </div>
    );
  }
}

export default App;
