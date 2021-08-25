import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';
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
            // forgotPass : '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/alerts');
            // again - change to my alerts if needed
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
            this.props.history.push('/alerts')
            // see above comment
        };

        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors : this.props.errors
            });
        };
    };

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit() {
        const { email, pass } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                // this.setState({
                //     user : userCredential.user
                // })
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
            // forgotPass
            errors
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

Login.PropTypes = {
    loginUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);