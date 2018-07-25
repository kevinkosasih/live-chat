import React from 'react';
import '../App.css';

export default class inputMessage extends React.Component{
  render(){
    return(
      <div className = "footer-app">
        <div className = "inputBarMessage">
          <input type = "text" className = "message" placeholder="type a message . . ."/>
        </div>
      </div>
    );
  }
}
