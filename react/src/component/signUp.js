import React, { Component } from 'react';
import '../style/floating-labels.css'
import {Redirect} from "react-router-dom";


class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      signUpName : '',
      signUpUsername : '',
      signUpEmail : '',
      signUpPassword1 : '',
      signUpPassword2 : '',
      isLoading:false,
      signedUp:false
    }

    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword1 = this.onTextboxChangeSignUpPassword1.bind(this);
    this.onTextboxChangeSignUpPassword2 = this.onTextboxChangeSignUpPassword2.bind(this);

    this.onSignUp = this.onSignUp.bind(this);

  }
  onTextboxChangeSignUpName(event) {
    this.setState({
      signUpName: event.target.value,
    });
  }
  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword1(event) {
    this.setState({
      signUpPassword1: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword2(event) {
    this.setState({
      signUpPassword2: event.target.value,
    });
  }

  onSignUp(e) {
    e.preventDefault();
   // Grab state
   const {
     signUpName,
     signUpUsername,
     signUpEmail,
     signUpPassword1,
     signUpPassword2
   } = this.state;

   this.setState({
     isLoading: true,
   });
   if(signUpPassword1 === signUpPassword2){
     // Post request to backend
     fetch('http://10.183.28.154:3001/regisnew', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         username : signUpUsername,
         password :signUpPassword1,
         email :signUpEmail,
         name : signUpName
       }),
     }).then(res => res.json())
       .then(json => {
         console.log('json', json);
         if (json.success) {
           this.setState({
             signUpError: json.message,
             isLoading: false,
             signUpEmail: '',
             signUpPassword: '',
             signedUp:true
           });
         } else {
           this.setState({
             signUpError: json.message,
             isLoading: false,
           });
         }
       });
   }
   else{
     e.preventDefault();
     this.setState({
       isLoading:false
     })
   }
  }

  render(){
    const {
      signUpName,
      signUpUsername,
      signUpEmail,
      signUpPassword1,
      signUpPassword2,
      isLoading,
      signedUp,
    } = this.state;
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if(signedUp){
      return(<Redirect to='/'/>)
    }
    else{
      return(
        <div className ="signup-form">
        <form className='form-signin'>
          {/*name*/}
          <div className='text-center mb-4'>
            <h1>Sign Up</h1>
            </div>
          {/*name*/}
          <div className='form-label-group'>
            <input
              type="text"
              id='signUpName'
              placeholder='Name'
              value={ signUpName}
              className='form-control'
              onChange={this.onTextboxChangeSignUpName}
            />
            <label htmlFor='signUpName'>Name</label>
            </div>
          {/*username*/}
          <div className='form-label-group'>
            <input
              type="Username"
              id='signUpUsername'
              placeholder="Username"
              className='form-control'
              value={ signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            />
            <label htmlFor='signUpUsername'>Username</label>
            </div>
          {/*email*/}
          <div className='form-label-group'>
            <input
              type="Email"
              id='signUpEmail'
              placeholder="Email"
              className='form-control'
              value={ signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <label htmlFor='signUpEmail'>Email</label>
            </div>
          {/*pass1*/}
          <div className='form-label-group'>
            <input
              type="password"
              id='signUpPassword1'
              className='form-control'
              placeholder="Password"
              value={ signUpPassword1}
              onChange={this.onTextboxChangeSignUpPassword1}
            />
            <label htmlFor='signUpPassword1'>Password</label>
            </div>
          {/*pass2*/}
          <div className='form-label-group'>
            <input
              type="password"
              id='signUpPassword2'
              placeholder="Confirm Password"
              className='form-control'
              value={ signUpPassword2}
              onChange={this.onTextboxChangeSignUpPassword2}
            />
            <label htmlFor='signUpPassword2'>Confirm Password</label>
            </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSignUp}>Sign Up</button>
          </form>
        </div>
      )
    }
  }
}

export default SignUp
