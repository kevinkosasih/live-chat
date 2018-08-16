import React, { Component } from 'react';

import '../../App.css';
import FriendList from './friend-list';

export default class SideNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Friends:{
              li:'selected-tab',
              tab:'show'
            },
            Chats:{
              li:'',
              tab:''
            },
            friendlistLength:this.props.friendlist.length,
            openedSocket:0
        }
        this.openedSocket = this.openedSocket.bind(this)
    }

    changeTab(tabName) {
      if(tabName === 'Friends'){
        this.setState({
          Friends:{
            li:'selected-tab',
            tab:'show'
          },
          Chats:{
            li:'',
            tab:''
          }
        })
      }else{
        this.setState({
          Friends:{
            li:'',
            tab:''
          },
          Chats:{
            li:'selected-tab',
            tab:'show'
          },
        })
      }
    }
    openedSocket(){
      const{openedSocket,friendlistLength} = this.state;
      if(openedSocket === friendlistLength){
        return false
      }
      else{
        this.setState({
          openedSocket:openedSocket+1
        })
        return true
      }
    }
    render() {
        const { Friends, Chats} = this.state
        const list = this.props.friendlist;
        if(!list){
          return null
        }
        const filteredList = list.filter(
          (item) => {
            return (
              item.name.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1
            );
          }
        );
        return (
          <div className = "menu-friend-container">
                <div className = "menu-friend-box">
                  <li onClick={() => this.changeTab('Friends')} className = {"li-friends " + Friends.li}>
                      Friends
                  </li>
                  <li onClick={() => this.changeTab('Chats')} className = {"li-groups " + Chats.li}>
                      Chats
                  </li>
                </div>
                <div className = {"menu-friend-list tab "+Friends.tab}>
                  <div className = "friend-list-container">
                    <div className="friend-list-box">
                      <div className="friend-list-text">
                      {filteredList.map((item) => (
                        <FriendList
                          changeName = {this.props.changeName}
                          item = {item}
                          key = {item._id}
                          openedSocket={this.openedSocket}
                        />
                        )
                      )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className ={"menu-group-list tab "+Chats.tab}>
                  This is the about page
                </div>
          </div>

        );
    }
}
