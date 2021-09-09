import React, { Component } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import ChangeEmail from './components/ChangeEmail';
import ChangePass from './components/ChangePass';
import ChangePhone from './components/ChangePhone';
import ForgotPass from './components/ForgotPass';
import { Navbar } from 'react-bootstrap';
import MyAlerts from './components/MyAlerts';
import Logout from './components/Logout';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PropTypes from 'prop-types';
import store from './store';
import { connect } from 'react-redux';
import { logoutUser, setCurrentUser } from './actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now()/1000;

  store.dispatch(setCurrentUser(decoded));
  
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // still need to decide on route
    window.location.href = '/users/login'
    // window.location.href = '/login'

  }
}

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <Navbar className='App-nav' bg="dark" variant="dark">
        <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/user/alerts'>My Alerts</NavLink>
        <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/user/settings/'>Settings</NavLink>
        <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/'>Logout</NavLink>
      </Navbar>
    );

    const guestLinks = (
      <Navbar className='App-nav' bg="dark" variant="dark">
        <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/user/register'>Register</NavLink>
        <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/user/login'>Login</NavLink>
      </Navbar>
    )
    
    return (
        <Router>   
          <Navbar className='App-nav' bg="dark" variant="dark">
            <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/'>Home</NavLink>
            <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/track/alerts'> Add Alerts</NavLink>
            { isAuthenticated ? authLinks : guestLinks }
          </Navbar>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/track/alerts" component={Alerts} />
            <Route exact path="/user/settings" component={Settings} />
            <Route exact path="/user/alerts" component={MyAlerts} />
            <Route exact path="/user/settings/email" component={ChangeEmail} />
            <Route exact path="/user/settings/password" component={ChangePass} />
            <Route exact path="/user/settings/phone" component={ChangePhone} />
            <Route exact path="/login/recovery" component={ForgotPass} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
      
        </Router>

    )
  }
}

App.propTypes = {
  logoutUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth
});

export default connect(mapStateToProps, { logoutUser }) (App);
