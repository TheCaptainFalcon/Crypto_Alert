import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import {
  Container,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import { ChakraProvider } from '@chakra-ui/react'; 
// This is needed for the CSS template to work/apply.
import ChangeEmail from './components/ChangeEmail';
import ChangePass from './components/ChangePass';
import ChangePhone from './components/ChangePhone';
import ForgotPass from './components/ForgotPass';
import firebase from 'firebase';
import MyAlerts from './components/MyAlerts';
import Logout from './components/Logout';

function App() { 
  const user = firebase.auth().currentUser;

  if(user === null) {
    return (
      <ChakraProvider>
      <Router>
        <div>
          <ul className="menu">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
               <NavLink to="/login">Login</NavLink>
            </li>
            <li>
               <NavLink to="/alerts">Alerts</NavLink>
            </li>
            {/* <li>
               <NavLink to="/settings">Account Settings</NavLink>
            </li> */}
          </ul>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/alerts" component={Alerts} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settings/alerts" component={MyAlerts} /> 
            <Route exact path="/settings/email" component={ChangeEmail} />
            <Route exact path="/settings/password" component={ChangePass} />
            <Route exact path="/settings/phone" component={ChangePhone} />
            <Route exact path="/login/recovery" component={ForgotPass} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
      </ChakraProvider>
    )
  } else {
    return (
      <ChakraProvider>
        <Router>
          <div>
            <ul className="menu">
              <li>
                <Menu>
                  <NavLink to="/">
                    <MenuButton as={Button} colorScheme="pink">Home</MenuButton>
                  </NavLink>
                </Menu>
              </li>
              {/* <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li> */}
              <li>
                <Menu>
                  <NavLink to="/alerts">
                    <MenuButton as={Button} colorScheme="pink">Setup Alerts</MenuButton>
                  </NavLink>
                </Menu>
              </li>
              {/* <li>
                <NavLink to="/settings">Account Settings</NavLink>
              </li> */}
              <li>
              <Menu>
                <MenuButton className="profileButton" as={Button} colorScheme="pink">Profile</MenuButton>
                <MenuList>
                    <MenuGroup className="profileHeader" title="Profile">
                      <NavLink to="/settings/alerts">
                        <MenuItem>My Alerts</MenuItem>
                      </NavLink>
                      <NavLink to="/settings">
                        <MenuItem>Account Settings</MenuItem>
                      </NavLink>
                      <NavLink to="/logout">
                        <MenuItem>Sign Out</MenuItem>
                      </NavLink>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup className="profileHeader" title="Help">
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
            </li>
              </ul>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/alerts" component={Alerts} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/settings/alerts" component={MyAlerts} />
              <Route exact path="/settings/email" component={ChangeEmail} />
              <Route exact path="/settings/password" component={ChangePass} />
              <Route exact path="/settings/phone" component={ChangePhone} />
              <Route exact path="/login/recovery" component={ForgotPass} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </div>
        </Router>
      </ChakraProvider>

    )
  }
}

export default App;
