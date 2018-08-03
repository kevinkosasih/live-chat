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
  }

   render(){
     return(
      <div className = "profile-container">
        <div className = "profile-picture-position">
          <Modal
            trigger={
              <div>
                <img src={profile} className ="profileImage" alt=""/>
                <b>{this.props.name}</b>
              </div>
            }
            centered={false}
          >
            <Modal.Header>{this.props.name}</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src={profile} alt="" />
              <Modal.Description>
                <p>This is {this.props.name}</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
        <div className = "profile-setting-icon-position">
          <img src = {setting} className = "setting-icon" onClick = {this.handleClose} alt=""/>
        </div>
        {this.state.isOpen ?
          <AddFriend
            modal = {this.state.showPopup}
            click = {this.handleClose}
            history = {this.props.history}/>
          : <AddFriend/>}
      </div>
     );
   }
 }
