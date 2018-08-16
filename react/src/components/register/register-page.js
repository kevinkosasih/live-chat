import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import logo from '../../picture/logo2.png';

class RegisterForm extends React.Component{
  constructor(props){
    super (props);

    this.state = {
      user : {
        username : '',
        email:'',
        password:'',
        retypePassword:''
      },
      usernameIsValid : true,
      firstNameIsValid : true,
      lastNameIsValid : true,
      emailIsValid : true,
      passwordIsValid : true,
      retypeIsValid : true
    }
  }

  handleUserData = (event) =>{
    event.preventDefault();
    let username = this.refs.username.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let retypePassword = this.refs.retypePassword.value;
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    if(!username){
      this.setState({
        usernameIsValid : false,
        messageUsername : "This field is required"
      });
    }
    else if(username.length < 5){
      this.setState({
        usernameIsValid : false,
        messageUsername : "Username must at least 5 characters"
      });
    }
    else if (username !== '' || username.length > 5){
      this.setState({
        usernameIsValid : true,
        messageUsername : ''
      });
    }
    if(!firstName){
      this.setState ({
        firstNameIsValid : false,
        messageFirstName : "this field is required"
      })
    }
    else if (firstName !== ''){
      this.setState({
        firstNameIsValid : true,
        messageFirstName : ''
      })
    }
    if(!lastName){
      this.setState ({
        lastNameIsValid : false,
        messageLastName : "this field is required"
      })
    }
    else if (lastName !== ''){
      this.setState({
        lastNameIsValid : true,
        messageLastName : ''
      })
    }
    if (!email){
      this.setState({
        emailIsValid : false,
        messageEmail : "This field is required"
      });
    }
    else if(!regex.test(email)){
      this.setState({
        emailIsValid : false,
        messageEmail : "Email invalid"
      });
    }
    else if (email !== '' || regex.text(email)){
      this.setState({
        emailIsValid : true,
        messageEmail : ''
      });
    }
    if (!password){
      this.setState({
        passwordIsValid : false,
        messagePass : "This field is required"
      });
    }
    else if(password.length < 6){
      this.setState({
        passwordIsValid : false,
        messagePass : "Password must at least 6 characters"
      });
    }
    else if (password.length >= 6) {
      this.setState({
        passwordIsValid : true,
        messagePass : ''
      });
    }
    if (retypePassword === ''){
      this.setState({
        retypeIsValid : false,
        messageRetype : "This field is required"
      });
    }
    else if(password !== retypePassword){
      this.setState({
        retypeIsValid : false,
        messageRetype : "Password did not match"
      });
    }
    else if (retypePassword !== '' || password === retypePassword){
      this.setState({
        retypeIsValid: true,
        messageRetype : ''
      })
    }
    if(this.state.usernameIsValid && this.state.firstNameIsValid && this.state.passwordIsValid && this.state.retypeIsValid && this.state.emailIsValid && this.state.lastNameIsValid){
      this.RegisUser(username,email,password,retypePassword,firstName,lastName);
    }
  }

  RegisUser(username,email,password,retypePassword,firstName,lastName){
    let name = firstName +" "+lastName
    fetch('/regisnew',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name:name,
        email:email,
      }),
    }).then(res => res.json())
      .then(json =>{
        console.log(json);
        if(json.success){
          console.log(json);
          this.props.history.push('/LoginForm')
        }
      })
    console.log(name);
  }

  render(){
    return(
      <div className = "background-top">
        <div className ="formRegister">
          <Form className = "formModal">
            <div className = "logo-position" >
              <img src = {logo} className = "logo" alt=''/>
            </div>
            <div className = "login-position">
              <h3><b>Hoo Hoo</b></h3>
            </div>
            <Form.Field className = {this.state.usernameIsValid ? "" : "error"}>
              <label>Username</label>
              <input
                placeholder='Username'
                type ='text'
                name = 'username'
                value = {this.state.userName}
                ref = 'username'
              />
            <div className = "errorMessage">{this.state.messageUsername}</div>
            </Form.Field>
            <Form.Field className = {this.state.firstNameIsValid ? "" : "error"}>
              <label>First Name</label>
              <input
                placeholder='First Name'
                type = 'text'
                ref = 'firstName' />
              <div className = "errorMessage">{this.state.messageFirstName}</div>
            </Form.Field>
            <Form.Field className = {this.state.lastNameIsValid ? "" : "error"}>
              <label>Last Name</label>
              <input
                placeholder='Last Name'
                type = 'text'
                ref = 'lastName'/>
              <div className = "errorMessage">{this.state.messageLastName}</div>
            </Form.Field>
            <Form.Field className = {this.state.emailIsValid ? "" : "error"}>
              <label>Email</label>
              <input
                placeholder = "Input Email"
                type ='email'
                name = 'email'
                value = {this.state.email}
                ref = 'email'
              />
            <div className = "errorMessage">{this.state.messageEmail}</div>
            </Form.Field>
            <Form.Field className = {this.state.passwordIsValid ? "" : "error"}>
              <label>Password</label>
              <input
                placeholder = "Password"
                type ='password'
                name = 'password'
                value = {this.state.password}
                ref = 'password'
              />
            <div className = "errorMessage">{this.state.messagePass}</div>
            </Form.Field>
            <Form.Field className = { this.state.retypeIsValid ? "" : "error"}>
              <label>Re-type Password</label>
              <input
                placeholder ="Re-type Password"
                type = 'password'
                name = 'retypePassword'
                value = {this.state.retypePassword}
                ref = 'retypePassword'
              />
            <div className = "errorMessage">{this.state.messageRetype}</div>
            </Form.Field>
            <Form.Field>
              <p>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</p>
            </Form.Field>
            <Button
            className = "buttonForm"
            type='submit'
            onClick = {this.handleUserData}
            >REGISTER
            </Button>
            <p>
              <Link to = '/LoginForm' className = "colorClickHere">{"Already have an account ?"}</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
