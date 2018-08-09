import React from 'react';
import '../../App.css';

import {Link} from 'react-router-dom';

import {
  recieveChat
}from "../../socket/socketconnect"

export default class FriendList extends React.Component{

  activeSocket(port){
    recieveChat(port,(err,recieve)=>{
      console.log(recieve);
    })
  }

  render(){
    const list = this.props.friendlist;
    const filteredList = list.filter(
      (item) => {
        return (
          item.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        );
      }
    );

    return(
        <div className = "friend-list-container">
          <div className="friend-list-box">
            <div className="friend-list-text">
              {filteredList.map((item) => (


                      <li className = "friend-list-text" key={item.id}

                        onClick={() =>
                          this.props.changeName(item.name)
                        }
                      >
                        {item.name}
                      </li>
                  )
                )
              }
            </div>
          </div>
        </div>
    );
  }
}
