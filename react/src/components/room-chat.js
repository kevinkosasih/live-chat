import React from 'react';
import '../App.css';
import Message from './text-message';
import Profile from './profile/profile';
import SearchFriend from './searchfriend/search-friend';
import MenuFriendList from'./friendlist/menu-friend-list';
import HeaderChat from './header-roomchat/header';
import Content from './content';
import {Route} from 'react-router-dom';

export default class RoomChat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : '',
      search : '',
      isOpen : false
    }
  }

  openChatRoom = (title) => {
    this.setState({
      name : title
    })
  }

  inputSearch = (e) =>{
    this.setState ({
      search : e.target.value
    })
  }

  render(){
    const{match} =this.props
    const rightColumn = ({match}) => (
      <div className = "right-column">
        <HeaderChat name={match.params.name}/>
        <Content/>
        <Message/>
      </div>
    )
    return (
      <div className = "background-top">
        <div className = "container-page">
          <div className = "container-chat">
            <div className = "default-chatroom">
              <Route path={match.url+'/:name'} component={rightColumn}/>
            </div>
            <div className = "left-column">
                <Profile
                  togglePopup = {this.togglePopup}
                  isOpen = {this.state.isOpen}
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
      </div>
    );
  }
}
