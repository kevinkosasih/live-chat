import React from 'react';
import '../../App.css';
import AddFriend from './addfriend';

import { Image, Modal} from 'semantic-ui-react';
import profile from '../../picture/muka.jpg';
import setting from '../../picture/menu.png';

 export default class Profile extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        isOpen : this.props.isClose,
        showPopup : 'popup-show'
      }
   }

  handleOpen = () => {
      this.setState(prevState => (
        {
          isOpen : !prevState.isOpen
        }
      )
    )
  }

   render(){
     console.log("ini isOpen yang profile: "+this.state.isOpen);
     console.log("ini showPopup yang profile: "+this.state.showPopup);
     return(
      <div className = "profile-container" >
        <div className = "profile-picture-position">
            <Modal
              trigger={
                <div className = "profileImageClick">
                  <img src={profile} className ="profileImage" alt=""/>
                  <b>Selena</b>
                </div>
              }
              centered={false}
            >
              <Modal.Header>Selena</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src={profile} alt="" />
                <Modal.Description>
                  <p>This is selena</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
        </div>
        <div className = "profile-setting-icon-position">
          <img src = {setting} className = "setting-icon" onClick = {this.handleOpen} alt="" />
        </div>
        {this.state.isOpen ?
        <AddFriend
          modal = {this.state.showPopup}
          click = {this.handleOpen}
          history = {this.props.history}/>
        : <AddFriend/>}
      </div>
     );
   }
 }
