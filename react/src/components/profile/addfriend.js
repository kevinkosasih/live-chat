import React from 'react';
import '../../App.css';

import {Image, Modal} from 'semantic-ui-react';
import profile from '../../picture/muka.jpg';


export default class AddFriend extends React.Component{

  toggleSettingButton(){

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
        <li>Log Out</li>
      </div>
    );
  }
}
