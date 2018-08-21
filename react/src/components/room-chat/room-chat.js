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
      isOpen : false
    }
  }

  componentDidMount(){
    const obj = getFromStorage('http://localhost:3000');
     if (obj && obj.token) {
       fetch('http://10.183.28.154:3001/getdata?token='+obj.token)
       .then(res => res.json())
       .then(json => {
         this.setState({
           account:json.akun,
           isLoading:false
         })
       })
     } else {
       setInStorage('http://localhost:3000',null)
       this.setState({
         isLoading: false,
       });
       // this.props.history.push('/')
     }
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
    return (
      <div className = "background-top">
        <div className = "container-page">
          {this.state.isOpen ?
            <div className = "rightColumn">
              <RightColumn
                name = {this.state.name}
              />
            </div> :
          <div className = "rightColumn">
          </div>}
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
