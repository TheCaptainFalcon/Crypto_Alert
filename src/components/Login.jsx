import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import './css/Login.css';
import firebase from 'firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            pass : '',
            forgotPass : ''
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
        e.preventDefault();
        const { email, pass } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                // test dev
                console.log('logged in!', user);
            }) 
            .catch((error) => {
                console.log('error', error)
            })
    };

    render() {
        const {
            email,
            pass,
            forgotPass
        } = this.state;

        const isInvalid = 
            email === '' ||
            pass === '';

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="title">Login</h1>
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
                <div className="form">
                    <FormControl id="pass" isRequired>
                        <FormLabel>Enter your password</FormLabel>
                        <Input 
                            name="pass"
                            type="password" 
                            placeholder="Enter your password" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div>
                    <a className="forgotPass" href="/login/recovery">Forgot Password?</a>
                </div>
                <Button type="submit" disabled={isInvalid}>Submit</Button>
            </form>
        )
    }
}

export default Login;