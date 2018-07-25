import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import LoginPage from './components/login/login-page';
import RegisterPage from './components/register/register-page';
import RoomChat from './components/room-chat';
import AddFriend from './components/profile/addfriend';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {App} />
      <Route path = "/loginForm" component = {LoginPage} />
      <Route path = "/RegisterForm" component = {RegisterPage} />
      <Route path="/ChatRoom" component={RoomChat}/>
    </Switch>
  </BrowserRouter>, document.getElementById('root'));


registerServiceWorker();
