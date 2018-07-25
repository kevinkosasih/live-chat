import React, { Component } from 'react';
import '../style/floating-labels.css'
import {
  setInStorage,
  getFromStorage
} from '../token/token.js';
import {Link,Redirect} from "react-router-dom";


class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      loginUsername:'',
      loginPassword:'',
      logged:false,
      isLoading:false
    }

    this.onTextboxChangeloginUsername = this.onTextboxChangeloginUsername.bind(this);
    this.onTextboxChangeloginPassword = this.onTextboxChangeloginPassword.bind(this);

    this.onLogin = this.onLogin.bind(this);

  }

  onTextboxChangeloginUsername(event){
    this.setState({
      loginUsername: event.target.value,
    });
  }
  onTextboxChangeloginPassword(event){
    this.setState({
      loginPassword: event.target.value,
    });
  }
  onLogin(e) {
    e.preventDefault()
     // Grab state
     const {
       loginUsername,
       loginPassword,
     } = this.state;
     this.setState({
       isLoading:true
     })
     // Post request to backend
     fetch('http://10.183.28.154:3001/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         username: loginUsername,
         password: loginPassword
       }),
     }).then(res => res.json())
       .then(json => {
         if (json.success) {
           setInStorage('http://localhost:3000', { token: json.token });
           this.setState({
             signInError: json.message,
             isLoading: false,
             signInPassword: '',
             signInEmail: '',
             token: json.token,
             logged:true
           });
         } else {
           this.setState({
             signInError: json.message,
             isLoading: false,
           });
         }
       });
   }

  render(){
    const {
      loginUsername,
      loginPassword,
      logged,
      isLoading
    } = this.state;
    const obj = getFromStorage('http://localhost:3000');
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if(logged || obj){
      return(<Redirect to='/page'/>)
    }
      return(
        <div className='signup-form'>
          <form className='form-signin'>
            <div className='text-center mb-4'>
              <h1>Tweey</h1>
            </div>
            <div className='form-label-group'>
              <input
                type="text"
                id='loginUsername'
                placeholder='Username'
                value={ loginUsername}
                className='form-control'
                onChange={this.onTextboxChangeloginUsername}
              />
              <label htmlFor='loginUsername'>Username</label>
            </div>
            <div className='form-label-group'>
              <input
                type="password"
                id='loginPassword'
                placeholder='Password'
                value={ loginPassword}
                className='form-control'
                onChange={this.onTextboxChangeloginPassword}
              />
              <label htmlFor='loginPassword'>Password</label>
            </div>
            <button className="btn btn-lg btn-primary btn-block"  onClick={this.onLogin}>Login</button>
            <Link to='/signup'><button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button></Link>
          </form>
        </div>
      )

  }
}

export default Login
