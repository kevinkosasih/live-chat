import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import logo from '../../picture/logo2.png';
import {FormErrors} from '../errorMessage/errorMessage';

class RegisterForm extends React.Component{
  constructor(props){
    super (props);

    this.state = {
      id : '',
      email:'',
      password:'',
      retypePassword:'',
      formErrors: {id:'',email:'',password:''},
      idValid : false,
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
    let idValid = this.state.idValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let retypePasswordValid = this.state.retypePasswordValid;

    switch(fieldName) {
      case 'id':
        idValid = value.length >= 5;
        fieldValidationErrors.id = idValid ? '' : ' must 5 character minimum';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'retypePassword':
        retypePasswordValid = value.length >= 6;
        fieldValidationErrors.password = retypePasswordValid ? '': ' did not match';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    idValid : idValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    retypePasswordValid : retypePasswordValid
                  }, this.validateForm);
  }

  validateForm (){
    this.setState(
      {
        formValid:
        this.state.idValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.retypePasswordValid
      }
    );
  }

  render(){
    return(
      <div className = "background-top">
        <div className ="formRegister">
          <Form className = "formModal">
            <div className = "logo-position">
              <img src = {logo} className = "logo"/>
            </div>
            <div className = "login-position">
              <h3><b>Hoo Hoo</b></h3>
            </div>
            <Form.Field>
              <label>ID</label>
              <input
                placeholder='ID'
                type ='text'
                name = 'id'
                value = {this.state.id}
                onChange = {this.handleUserInput}
              />
            </Form.Field>
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
                onChange = {this.handleUserInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder = "Password"
                type ='password'
                name = 'password'
                value = {this.state.password}
                onChange = {this.handleUserInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Re-type Password</label>
              <input
                placeholder ="Re-type Password"
                type = 'password'
                name = 'retypePassword'
                value = {this.state.retypePassword}
                onChange = {this.handleUserInput}
              />
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
