import React from 'react';
import '../../App.css';
import icon from '../../picture/search.png';

export default class SearchFriend extends React.Component{

  render(){
    return(
      <div>
        <input
          type = "text"
          className = "search-friend"
          placeholder = "Search or start new chat"
          value = {this.props.search}
          onChange = {this.props.onChange}/>
        <img src = {icon}/>
      </div>
    );
  }
}
