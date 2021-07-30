import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button

} from '@chakra-ui/react';
import firebase from 'firebase';

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            email : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit(e) {
        const {email} = this.state
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log('email sent!', email)
            })
            .catch((error) => {
                console.log('error', error)
            });
    }
    
    render() { 
        const {
            email
        } = this.state;

        const isInvalid = 
            email === '';

        return (  
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="title">Password Recovery</h1>
                <div className="form">
                    <FormControl id="email" isRequired>
                        <FormLabel>Enter your email address</FormLabel>
                        <Input 
                            name="email"
                            type="email" 
                            placeholder="Enter your email address" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <Button type="submit" disabled={isInvalid}>Submit</Button>
                {/* modal with status update of new email being sent and automatic redirect function */}
            </form>
        );
    }
}
 
export default ForgotPass;