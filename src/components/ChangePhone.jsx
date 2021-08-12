import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Select
} from '@chakra-ui/react';
import firebase from 'firebase';
import axios from 'axios';

class ChangePhone extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            phoneNumber: '',
            confirmPhoneNumber:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleChange(e) {
        this.setState({ 
            [e.target.name] : e.target.value 
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        // must be named phoneNumber due to innate firebase props
        // must also be verified and go through verification flow
        //* could also send post request to database with phone number
        // easy to check with get request to see if phone is available
        // with conditional validation code
        // use email verified props to allow or disallow page
        // after logging in.

        // const { phoneNumber } = this.state;
        // const stringPhoneNumber = phoneNumber.toString();
        // const user = firebase.auth().currentUser;

        // const appVerifier = new firebase.auth.RecaptchaVerifier('save-user-button', { size : 'invisible' });
        // const authProvider = new firebase.auth.PhoneAuthProvider();
        // const verificationId = authProvider.verifyPhoneNumber(phoneNumber, appVerifier);
        // const verificationCode = window.prompt('Enter the verification code sent to your phone');
        // const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
        // user.updatePhoneNumber(phoneCredential)
           
        const { phoneNumber } = this.state;
        const user = firebase.auth().currentUser;
        const url = "https://crypto-alert-12f21-default-rtdb.firebaseio.com/" + `${user.uid}.json`;
        axios.put(url, {
            phone : phoneNumber
        })
        .then((res) => {
            console.log('success', res)
            // email can be accessed from user.email - therefore no need for db post
            console.log('props', user)
        })

        .catch((err) => {
            console.log('error', err)
        })
    }

    handleGoBack(e) {
        e.preventDefault();
        this.props.history.push('/settings');
    };

        // const { phoneNumber } = this.state;
        // const user = firebase.auth().currentUser;
        // user.updateProfile({
        //     phone: phoneNumber
        // })
    //     .then(() => {
    //         console.log('phone number updated', phoneNumber)
    //         console.log(user)
    //     })
    //     .catch((err) => {
    //         console.log('error has occurred', err)
    //     })
    // };

    render() { 
        const {
            phoneNumber,
            confirmPhoneNumber
        } = this.state;

        const isInvalid =
            phoneNumber === '' ||
            confirmPhoneNumber === '' ||
            phoneNumber !== confirmPhoneNumber;
        
        const user = firebase.auth().currentUser;

        return (  
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form">
                    <FormControl id="phoneNumber" isRequired>
                        <p>Current Phone number: {user.phoneNumber}</p>
                        {/* add select drop down for area code? */}
                        <FormLabel>Change your phone number</FormLabel>
                        <Input 
                            name="phoneNumber"
                            type="number" 
                            placeholder="Enter a new phone number" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmPhoneNumber" isRequired>
                        <FormLabel>Confirm new phone number</FormLabel>
                        <Input 
                            name="confirmPhoneNumber"
                            type="number" 
                            placeholder="Confirm new phone number" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <Button onClick={this.handleGoBack}>Go Back</Button>
                <Button id="save-user-button" type='submit' disabled={isInvalid}>Save</Button>
            </form>
        );
    }
}
 
export default ChangePhone;