import React from 'react';
import '../App.css';
import {Button , Segment} from 'mdbreact';
import {Link} from 'react-router-dom';
class WelcomePage extends React.Component{
  render (){
    return (
      <div className = "welcomeButton">
        <Link to = '/LoginForm'>
          <Button
          outline color = "warning"
          size ="lg">
            Welcome to chat application website!
            Click me to login :)
          </Button>
        </Link>
      </div>
    );
  }
}

export default WelcomePage;
