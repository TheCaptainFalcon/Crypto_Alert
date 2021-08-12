import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import firebase from 'firebase';

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            email : '',
            confirmEmail : ''
        }
        // where to enter functions to bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    };

    handleChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        const user = firebase.auth().currentUser;
        user.updateEmail(email)
            .then(() => {
                console.log(`${email} + has been changed!`)
            })
            .catch((err) => {
                console.log('error has occurred', err)
            })
    };

    handleGoBack(e) {
        e.preventDefault();
        this.props.history.push('/settings');
    }

    render() { 
        const {
            email,
            confirmEmail
        } = this.state;

        const isInvalid = 
        email === '' ||
        email !== confirmEmail ||
        confirmEmail === ''

        return (  
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form">
                    <FormControl id="email" isRequired>
                        <FormLabel>Change email address</FormLabel>
                        <Input 
                            name="email"
                            type="email" 
                            placeholder="Enter your email address" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmEmail" isRequired>
                        <FormLabel>Confirm change to email address</FormLabel>
                        <Input 
                            name="confirmEmail"
                            type="email" 
                            placeholder="Reenter your email address" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <Button onClick={this.handleGoBack}>Go Back</Button>
                <Button type="submit" disabled={isInvalid}>Save</Button>
            </form>
        );
    }
}
 
export default ChangeEmail;