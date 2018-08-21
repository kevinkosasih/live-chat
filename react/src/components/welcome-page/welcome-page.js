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
    const obj = getFromStorage('chattoken');
     if (obj && obj.token) {
       fetch('/getdata?token='+obj.token)
       .then(json => {
         this.props.history.push('/chatRoom')
       })
     } else {
       setInStorage('chattoken',null)
       this.setState({
         isLoading: false,
       });
     }
  }
  render (){
    return (
      <div className = "welcomeButton">
        <Link to = '/LoginForm'>
          <Button
          inverted color = "orange"
          size = "huge">
            Welcome to chat application website!
            Click me to login :)
          </Button>
        </Link>
      </div>
    );
  }
}

export default WelcomePage;
