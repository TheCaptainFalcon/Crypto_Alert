import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
// import {
//   Container,
//   Box,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuItemOption,
//   MenuGroup,
//   MenuOptionGroup,
//   MenuIcon,
//   MenuCommand,
//   MenuDivider,
// } from "@chakra-ui/react";
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import { ChakraProvider } from '@chakra-ui/react'; 
// This is needed for the CSS template to work/apply.
import ChangeEmail from './components/ChangeEmail';
import ChangePass from './components/ChangePass';
import ChangePhone from './components/ChangePhone';

function App() {
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
            <li>
               <NavLink to="/settings">Account Settings</NavLink>
            </li>
            {/* <li>
            <Menu>
                <MenuButton as={Button} colorScheme="pink">
                Profile
                
                </MenuButton>
                <MenuList>
                    <MenuGroup title="Profile">
                        <MenuItem>My Alerts</MenuItem>
                        <MenuItem>Account Settings </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
            </li> */}
          </ul>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/alerts" component={Alerts} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/settings/email" component={ChangeEmail} />
            <Route exact path="/settings/password" component={ChangePass} />
            <Route exact path="/settings/phone" component={ChangePhone} />
          </Switch>
        </div>
      </Router>
      </ChakraProvider>
      
  );
}

export default App;
