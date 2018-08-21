import React from 'react';
import './room-chat.css';
import Message from '../text-message/text-message';
import Profile from '../profile/profile';
import SearchFriend from '../searchfriend/search-friend';
import MenuFriendList from'../friendlist/menu-friend-list';
import FriendList from'../friendlist/friend-list';
import HeaderChat from '../header-roomchat/header';
import Content from '../content/content';
import {Route} from 'react-router-dom';
import {
  getFromStorage,
  setInStorage
} from '../../token/storage';

export default class RoomChat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      search : '',
      isOpen : false,
      isLoading:true,
      ulang:[],
      account:[],
      chatlog:[]
    }
    this.escClicked = this.escClicked.bind(this)
  }

  componentDidMount(){
       fetch('/getdata',{
         credentials:'include'
       })
       .then(res => res.json())
       .then(json => {
         if(!json.success){
           this.props.history.push('/')
         }
         else{
           this.setState({
             account:json.akun,
             isLoading:false
           })
         }
       })
  }

  openChatRoom = (item,log) => {
    if(item !== null){
      this.setState({
      name : item.name,
      isOpen : true,
      username:item.username,
      chatlog:log
      })
    }
    else{
      this.setState({
        chatlog:log
      })
    }
  }

  inputSearch = (e) =>{
    this.setState ({
      search : e.target.value
    })
  }

  escClicked(){
    this.setState({
      isOpen:false
    })
  }

  render(){
    const {account,isLoading} = this.state
    if(isLoading){
      return(
        <div>Loading.....</div>
      )
    }
    return (
      <div className = "background-top">
        <div className = "container-page">
          {!this.state.isOpen?
            <div className = "rightColumn">
            </div>
            :
            <div className = "rightColumn">
              <HeaderChat name = {this.state.name}/>
              <Content
                escClicked = {this.escClicked}
                chatlog = {this.state.chatlog}
              />
              <Message
                sender={account.username}
                recieve={this.state.username}
              />
            </div>
          }
          <div className = "left-column">
              <Profile
                togglePopup = {this.togglePopup}
                history = {this.props.history}
                isClose = {this.state.isOpen}
                name = {account.name}
              />
              <div className = "searchBarContent">
                <SearchFriend
                  search = {this.state.search}
                  onChange = {this.inputSearch}
                />
              </div>
              <MenuFriendList
                changeName={this.openChatRoom}
                searchValue = {this.state.search}
                friendlist = {account.friends}
              />
          </div>
        </div>
      </div>
    );
  }
}
