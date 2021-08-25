import React, { Component } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
            username : '', 
            email : '',
            pass : '',
            confirmPass: '',
            errors : {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // placing [] is able to grab name during runtime even if unknown before init
    // need to label name field as props for inputs to work and be equal to state name
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        const { email, pass } = this.state;
        const user = firebase.auth().currentUser

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                // test dev
                console.log('success', user);
            })
            .catch((error) => {
                console.log('error has occurred', error)
                // const errorCode = error.code;
                // const errorMessage =  error.message;
            })
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/alerts');
            // or my alerts route
        };
    };

    componentDidUpdate(prevProps) {
        // use if componentdidmount doesnt comply --
        // if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
        //     this.props.history.push('')
        // }

        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors : this.props.errors
            });
        };
    };

    render() {

        const {
            user,
            email,
            pass,
            confirmPass,
            error
        } = this.state;

        // could import from validation instead of defining here
        // simple error validation 
        const isInvalid =
            pass !== confirmPass ||
            pass === '' ||
            email === '';

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="title">Sign Up</h1>
                <div className="form">
                    <FormControl id="email" isRequired>
                        <FormLabel>Enter your email address</FormLabel>
                        <Input 
                            name="email"
                            value= {email}
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
                            value={pass}
                            type="password" 
                            placeholder="Enter your password" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmPass" isRequired>
                        <FormLabel>Confirm your password</FormLabel>
                        <Input 
                            name="confirmPass"
                            value={confirmPass}
                            type="password" 
                            placeholder="Confirm your password" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                {/* TOS textarea with checkbox - is required */}
                <Button type="submit" disabled={isInvalid}>Submit</Button>
            </form>
        )
    }
}

Signup.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));