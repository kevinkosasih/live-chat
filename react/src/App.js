import React, { Component } from 'react';
import WelcomePage from './components/welcome-page';
import './App.css';
import LoginPage from './components/login/login-page';

class App extends Component {
  constructor(props){
    super (props);

    this.state = {
      toggleButton : false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      toggleButton : true
    })
  }

  render() {
    if(!this.state.toggleButton){
      return(
        <div className="App" onClick = {this.toggle}>
          <center>
            <WelcomePage/>
          </center>
        </div>
      );
    }
    return (
        <LoginPage/>
    );
  }
}

export default App;
