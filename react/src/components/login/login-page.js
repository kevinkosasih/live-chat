import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../../picture/logo2.png';

class LoginForm extends React.Component{
  render(){
    return(
      <div className = "background-top">
        <div className = "formLogin">
          <Form className = "formModal">
            <div className = "logo-position">
              <img src = {logo} className = "logo"/>
            </div>
            <div className = "login-position">
              <h3><b>Hoo Hoo</b></h3>
            </div>
            <Form.Field>
              <label> Email </label>
              <input placeholder='Email' type ="email"/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder ="Password" type='password' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Remember Me' />
            </Form.Field>
            <Button
            className = "buttonForm"
            type='submit'
            >LOG IN
            </Button>
            <p>
              {"Doesn't have an account yet? "}
              <Link to = '/RegisterForm' className = "colorClickHere">Click Here </Link>
              to register!
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm
