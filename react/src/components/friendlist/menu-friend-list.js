import React, { Component } from 'react';

import '../../App.css';
import FriendList from './friend-list';

export default class SideNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderTab: 'Friends',
            Friends:'selected-tab',
            Groups:''
        }
    }

    changeTab(tabName) {
      if(tabName === 'Friends'){
        this.setState({
          Friends:'selected-tab',
          Groups:''
        })
      }else{
        this.setState({
          Friends:'',
          Groups:'selected-tab'
        })
      }
        this.setState({ renderTab: tabName })
    }

    render() {
        const { renderTab ,Friends, Groups} = this.state
        //
        const RenderedContent = ({ searchValue,changeName,tabName }) => {
            if (tabName === 'Friends') {
                return FriendsTab(changeName,searchValue)
            }
            if (tabName === 'Groups') {
                return GroupsTab()
            }
        }
        //
        const FriendsTab = (changeName,searchValue) => (
            <div className = "menu-friend-list">
              <FriendList
                changeName = {changeName}
                search = {searchValue}
                friendlist={this.props.friendlist}
                />
            </div>
        )
        //
        const GroupsTab = () => (
            <div className = "menu-group-list">
              This is the about page
            </div>
        )
        //
        return (
          <div className = "menu-friend-container">
                <div className = "menu-friend-box">
                  <li onClick={() => this.changeTab('Friends')} className = {"li-friends " + Friends}>
                      Friends
                  </li>
                  <li onClick={() => this.changeTab('Groups')} className = {"li-groups " + Groups}>
                      Groups
                  </li>
                </div>
                <RenderedContent
                  searchValue = {this.props.searchValue}
                  changeName = {this.props.changeName}
                  tabName = {renderTab}
                />
          </div>

        );
    }
}
