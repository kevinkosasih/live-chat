import React from 'react';
import '../App.css';
import Message from './text-message';
import Profile from './profile/profile';
import SearchFriend from './searchfriend/search-friend';
import MenuFriendList from'./friendlist/menu-friend-list';
import FriendList from'./friendlist/friend-list';
import HeaderChat from './header-roomchat/header';
import Content from './content';
import {Route} from 'react-router-dom';
import {
  recieveChat
}from "../socket/socketconnect"

export default class RoomChat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      search : '',
      isOpen : false,
      isLoading:true,
      ulang:[]
    }
    this.activeSocket= this.activeSocket.bind(this)

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
           for(var i = 0;i<json.akun.friends.length;i++){
             this.activeSocket(json.akun.friends[i].username)
           }}
       })
  }
  activeSocket(port){
    recieveChat(port,(err,recieve)=>{
      let asd = this.state.ulang.concat(recieve)
      this.setState({
        ulang:asd
      })
      console.log(this.state.ulang);
    })
  }
  openChatRoom = (title) => {
    this.setState({
      name : title,
      isOpen : true
    })
  }

  inputSearch = (e) =>{
    this.setState ({
      search : e.target.value
    })
  }

  render(){

    if(this.state.isOpen == true){
      return(
        <div className = "background-top">
          <div className = "container-page">
            <div className = "rightColumn">
              <RightColumn
                name = {this.state.name}
              />
            </div>
            <div className = "left-column">
                <Profile
                  history = {this.props.history}
                  isClose = {this.state.isOpen}
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
      )
    }
    return (
      <div className = "background-top">
        <div className = "container-page">
          <div className = "rightColumn">
          </div>
          <div className = "left-column">
              <Profile
                togglePopup = {this.togglePopup}
                history = {this.props.history}
                isClose = {this.state.isOpen}
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
              />
          </div>
        </div>
      </div>
    );
  }
}

const RightColumn = ({name}) => (
  <div>
    <HeaderChat name = {name}/>
    <Content/>
    <Message/>
  </div>
)
