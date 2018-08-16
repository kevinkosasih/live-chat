import React from 'react';
import '../../App.css';
import {
  recieveChat
}from "../../socket/socketconnect"

export default class FriendList extends React.Component{

  componentDidMount(){
    if(this.props.openedSocket()){
      this.activeSocket(this.props.item.username)
    }
  }
  activeSocket(port){
    recieveChat(port,(err,recieve)=>{
      console.log(recieve);
    })
  }

  render(){
    const item = this.props.item;
    return(
      <li className = "friend-list-text"
        onClick={() =>
          this.props.changeName(item)
        }
      >
        {item.name}
      </li>
    );
  }
}
