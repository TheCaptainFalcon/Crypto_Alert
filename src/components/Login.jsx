import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import './css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            pass : '',
            forgotPass : ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
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

    render() {
        return (
            <form className="container">
                <h1 class="title">Login</h1>
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
                <div>
                    <a className="forgotPass" href="/login/recovery">Forgot Password?</a>
                </div>
                <Button>Submit</Button>
            </form>
        )
    }
}

export default Login;