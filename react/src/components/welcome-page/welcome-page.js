import React from 'react';
import './welcome-page.css';
import {Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {
  setInStorage,
  getFromStorage
} from '../../token/storage'

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
