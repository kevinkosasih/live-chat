import React from 'react';
import '../App.css';
import {
  sendChat
}from "../socket/socketconnect"

export default class inputMessage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      message:''
    }

    this.messageOnChange =this.messageOnChange.bind(this);
  }

  messageOnChange(e){
    this.setState({
      message:e.target.value
    })
  }

  onSend(e){
    e.preventDefault();
    sendChat(this.state.messageS)
  }

  render(){
    return(
      <div className = "footer-app">
        <div className = "inputBarMessage">
          <form>
            <input type = "text" className = "message" placeholder="type a message . . ." value={this.state.message} onChange={this.messageOnChange}/>
          </form>
        </div>
      </div>
    );
  }
}
