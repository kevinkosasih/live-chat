import React, { Component } from 'react';
import SignUp from './signUp'
import Login from './login'
import Home from './home'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import {
  setInStorage,
} from '../token/token.js';

  import {
    getFromStorage,
  } from '../token/token.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
    };

    this.componentDidMount = this.componentDidMount.bind(this)

  }
  componentDidMount() {
   const obj = getFromStorage('http://localhost:3000');
   if (obj && obj.token) {
     const { token } = obj;
     // Verify token
       fetch('http://10.183.28.154:3001/verify?token=' + token)
       .then(res => res.json())
       .then(json => {
         if (json.success) {
           this.setState({
             token,
             isLoading: false
           });
         } else {
           this.setState({
             token:'',
             isLoading: false,
           });
         }
       });
   } else {
     this.setState({
       token:'',
       isLoading: false,
     });
   }
 }

  render() {
    const {
      isLoading,
    } = this.state;
    const login = () => (
      <Login token={this.state.token}/>
    )
    const home = () => (
      <Home token={this.state.token}/>
    )
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
        <Router>
          <Switch>
            <Route path='/' exact component={login}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/page' component={home}/>
          </Switch>
          </Router>
      );
  }
}

export default App;
