import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';
import { Form, Control, Card, Button } from 'react-bootstrap';
import './css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            pass : '',
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

    handleSubmit(e) {
        e.preventDefault();
        const { email, pass } = this.state;
        const userCredentials = {
            email : email,
            pass : pass
        };

        this.props.loginUser(userCredentials);
    };
        

    render() {
        const {
            email,
            pass,
            errors
        } = this.state;

        const isInvalid = 
            email === '' ||
            pass === '';

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="title">Login</h1>
                <div className="form">
                    <Form.Control id="email" isRequired>
                        <Form.Label>Enter your email address</Form.Label>
                      
                            name="email"
                            className={classnames({ "is-invalid" : errors.email })}
                            type="email" 
                            placeholder="Enter your email address" 
                            onChange={this.handleChange}
                    
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </Form.Control>
                </div>
                <div className="form">
                    <Form.Control id="pass" isRequired>
                        <Form.Label>Enter your password</Form.Label>
             
                            name="pass"
                            type="password" 
                            placeholder="Enter your password" 
                            onChange={this.handleChange}
                  
                        {errors.pass && (<div className="invalid-feedback">{errors.pass}</div>)}
                    </Form.Control>
                </div>
                <div>
                    <a className="forgotPass" href="/login/recovery">Forgot Password?</a>
                </div>
                <Button type="submit" disabled={isInvalid}>Submit</Button>
            </form>
        )
    }
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);