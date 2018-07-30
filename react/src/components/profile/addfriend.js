import React from 'react';
import '../../App.css';

import { Modal} from 'semantic-ui-react';

import {
  setInStorage,
  getFromStorage
}from '../../token/storage'

export default class AddFriend extends React.Component{
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this)
  }
  logout(e) {
    e.preventDefault()
     const obj = getFromStorage('http://localhost:3000');
     if (obj && obj.token) {
       const { token } = obj;
       // Verify token
       fetch('http://10.183.28.154:3001/logout?token=' + token)
         .then(res => res.json())
         .then(json => {
           if (json.success) {
             setInStorage('http://localhost:3000', null)
             this.props.history.push('/LoginForm')
           }
          }
        );
     }
   }
  render(){
    return(
      <div className = {"popup-container "+ this.props.modal}>
        <Modal trigger={<li onClick = {this.props.click}>Add Friend</li>}
          centered={false} className = "addfriend-container">
          <Modal.Header>Add Friends</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>This is selena</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <li onClick={this.logout}>Log Out</li>
      </div>
    );
  }
}
