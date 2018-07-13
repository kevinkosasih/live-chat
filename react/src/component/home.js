import React, { Component } from 'react';
import {
  getFromStorage,
  setInStorage
} from '../token/token.js';
import {Redirect} from "react-router-dom";
import Header from '../header/header'
import ChatBox from './chatbox.js'
import {
  sendChat,
  recieveChat
} from '../socket/socketconnect.js'
import '../style/home.css'


class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {
      account:'',
      loggedOut:false,
      isLoading: true,
      conv:[],
      chat:''
    };

    this.logout = this.logout.bind(this)
    this.onTextboxChange = this.onTextboxChange.bind(this)
    this.onSend = this.onSend.bind(this)

    recieveChat((err,recieve)=>{
      let newhistory = this.state.conv.concat(recieve);
      this.setState({
        conv:newhistory
      })
    })
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
       this.setState({
         isLoading: false,
       });
     }

  }

  logout(e) {
    e.preventDefault()
     this.setState({
       isLoading: true
     });
     const obj = getFromStorage('http://localhost:3000');
     if (obj && obj.token) {
       const { token } = obj;
       // Verify token
       fetch('http://10.183.28.154:3001/logout?token=' + token)
         .then(res => res.json())
         .then(json => {
           if (json.success) {
             setInStorage('http://localhost:3000', null)
             this.setState({
               loggedOut:true,
               isLoading: false
             })
           } else {
             this.setState({
               isLoading: false,
             });
           }
         });
     } else {
       this.setState({
         isLoading: false,
       });
     }
   }
   onTextboxChange(e){
     this.setState({
       chat:e.target.value
     })
   }
   onSend(e){
     e.preventDefault()
     let msg  = {
       name:this.state.account.name,
       text:this.state.chat,
     }
     console.log(this.state.account);
     sendChat(msg)
   }
  render(){
    const obj = getFromStorage('http://localhost:3000');
    const{
      loggedOut,
      isLoading,
      account,
      conv,
      chat
    } = this.state
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
          </div>);
    }
    if(loggedOut || !obj.token  ){
      return(<Redirect to='/'/>)
    }

    return(
      <div className="page">
        <Header logout={this.logout}/>
        <div className = 'chatboxlist'>
          <ChatBox name= {account.name}/>
        </div>
        <div className = 'coversations'>
          {conv ? conv.map(chat =>
              <div>
                <hr/>
                {chat.name}
                <hr/>
                {chat.text}
                <hr/>
              </div>
            )
          :
          (null)
        }
        <div className='textchat col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3'>
          <form className='form-inline'>
            <input type  = 'text' className='textbox form-control' placeholder='input text here ...' value={chat} onChange={this.onTextboxChange}/>
            <input type = 'submit' className='btn btn-info' value="Send" onClick={this.onSend}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
