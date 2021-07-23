import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button
} from '@chakra-ui/react';
import './css/Signup.css';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email : '',
            pass : '',
            confirmPass: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handleEmailChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);

    }

    handleEmailChange(e) {
        this.setState({
            email : e.target.value
        })
    };

    handlePassChange(e) {
        this.setState({
            pass : e.target.value
        })
    };

    handleConfirmPassChange(e) {
        this.setState({
            confirmPass : e.target.value
        })
    };

    render() {
        return (
            <form className="container">
                <h1 className="title">Sign Up</h1>
                <div className="form">
                    <FormControl id="email" isRequired>
                        <FormLabel>Enter your email address</FormLabel>
                        <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            onChange={this.handleEmailChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="pass" isRequired>
                        <FormLabel>Enter your password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            onChange={this.handlePassChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmPass" isRequired>
                        <FormLabel>Confirm your password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Confirm your password" 
                            onChange={this.handleConfirmPassChange}
                        />
                    </FormControl>
                </div>
                {/* TOS textarea with checkbox - is required */}
                <Button>Submit</Button>
            </form>
        )
    }
}

export default Signup;