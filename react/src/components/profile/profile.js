import React from 'react';
import '../../App.css';
import AddFriend from './addfriend';

import { Button, Header, Image, Modal,Popup, Dropdown } from 'semantic-ui-react';
import profile from '../../picture/muka.jpg';
import setting from '../../picture/menu.png';
import {Link} from 'react-router-dom';

 export default class Profile extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        isOpen : false,
        showPopup : 'popup-show'
      }
   }

  handleClose = () => {
      this.setState(prevState => (
        {
          isOpen : !prevState.isOpen
        }
      )
    )
    console.log(this.state.isOpen);
  }

   render(){
     const {isOpen} = this.state
     console.log("ini state yang profile: "+this.state.isOpen);
     return(
      <div className = "profile-container">
        <div className = "profile-picture-position">
          <Modal trigger={<img src={profile} className ="profileImage"/>} centered={false}>
            <Modal.Header>Selena</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src={profile} />
              <Modal.Description>
                <p>This is selena</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
        <div className = "profile-setting-icon-position">
          <img src = {setting} className = "setting-icon" onClick = {this.handleClose}/>
        </div>
        {this.state.isOpen ?
          <AddFriend
            modal = {this.state.showPopup}
            click = {this.handleClose}/>
          : <AddFriend/>}
      </div>
     );
   }
 }
