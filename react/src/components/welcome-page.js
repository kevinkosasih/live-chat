import React from 'react';
import '../App.css';
import {Button } from 'mdbreact';
import {Link} from 'react-router-dom';

class WelcomePage extends React.Component{
  componentDidMount(){
    fetch('/verify',{
      credentials:'include'
    })
     .then(res => res.json())
     .then(json => {
       if(json.success){
          this.props.history.push('/ChatRoom')
       }
     })
  }
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
