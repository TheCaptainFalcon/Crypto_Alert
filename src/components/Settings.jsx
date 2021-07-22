import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from "@chakra-ui/react"
import './css/Settings.css'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // where to enter functions to bind
        this.emailPressed = this.emailPressed.bind(this);
        this.passPressed = this.passPressed.bind(this);
        this.phonePressed = this.phonePressed.bind(this);
        this.deletePressed = this.deletePressed.bind(this);
        
    };


    emailPressed() {
        alert('email has been pressed')
        this.props.history.push('/settings/email');
        // test 
        console.log(this.props)
    }

    passPressed() {
        alert('password has been pressed')
        this.props.history.push('/settings/password')
    }

    phonePressed() {
        alert('phone has been pressed')
        this.props.history.push('/settings/phone')
    }

    deletePressed() {
        alert('delete has been pressed')
        // filler until modal confirmed
    }
    
    render() {

        return (
            <div className="container">
                <div className="emailBox">
                    <Button className='button' onClick={this.emailPressed}>Change Email</Button>
                </div>
                <div className="passBox">
                    <Button className='button' onClick={this.passPressed}>Change Password</Button>
                </div>
                <div className="phoneBox">
                    <Button className='button' onClick={this.phonePressed}>Change Phone number</Button>
                </div>
                <div className="deleteBox">
                    <Button onClick={this.deletePressed}>Delete Account</Button>
                </div>
            </div>
       )
    }
}

export default Settings;