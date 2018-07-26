import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import logo from '../../picture/logo2.png';
import {FormErrors} from '../errorMessage/errorMessage';

class RegisterForm extends React.Component{
  constructor(props){
    super (props);

    this.state = {
      firstName : '',
      lastName: '',
      email:'',
      password:'',
      retypePassword:'',
      formErrors: {email:'',password:''},
      emailValid : false,
      passwordValid: false,
      retypePasswordValid :false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => { this.validateField(name, value) });
    console.log("ini nama "+name);
    console.log("ini value: "+value);
  }

  validateField (fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm (){
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  render(){
    return(
      <div className = "background-top">
        <div className ="formRegister">
          <Form className = "formModal">
            <div className = "logo-position">
              <img src = {logo} className = "logo" alt=""/>
            </div>
            <div className = "login-position">
              <h3><b>Hoo Hoo</b></h3>
            </div>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder = "Input Email"
                type ='email'
                name = 'email'
                value = {this.state.email}
                onChange = {this.handleUserInput} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder = "Password"
                type ='password'
                name = 'password'
                value = {this.state.password}
                onChange = {this.handleUserInput}/>
            </Form.Field>
            <Form.Field>
              <label>Re-type Password</label>
              <input placeholder ="Re-type Password" type='password' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <div className= "errorMessage">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <Button
            className = "buttonForm"
            type='submit'
            disabled = {!this.state.formValid}
            >REGISTER
            </Button>
            <p>
              {"Already have an account "}
              <Link to = '/LoginForm' className = "colorClickHere">Click Here </Link>
              to login!
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
