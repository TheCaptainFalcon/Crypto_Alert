import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';
import { Form, Control, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import './css/Login.css';

const FormWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: centerl
    margin: 2rem;
    padding 1rem;
`;

const Wrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const MainLabel = styled.label`
    display: flex;
    justify-content: center;
    color: black;
    font-weight: bold;
    margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
    margin: 0.5rem auto 1rem auto;
`;

const CardTitle = styled.h1`
    display: flex;
    font-weight: bold;
    justify-content: center;
    margin: 1rem 2rem 0.25rem 2rem;
`;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/track/alerts');
            // again - change to my alerts if needed
        }
    };

    componentDidUpdate(prevProps) {
        // if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
        //     this.props.history.push('/track/alerts')
        //     // see above comment
        // };

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
        const { email, password } = this.state;
        const userCredentials = {
            email : email,
            password : password
        };

        this.props.loginUser(userCredentials);
    };
        

    render() {
        const {
            email,
            password,
            errors
        } = this.state;

        const isInvalid = 
            email === '' ||
            password === '';

        return (
            <Wrapper>
                <FormWrapper>
                    <Card className="card">
                        <CardTitle>Login</CardTitle>
                        <Form className="form" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <MainLabel>Email</MainLabel>
                            
                            <Form.Control
                                name="email"
                                className={classnames({ "is-invalid" : errors.email })}
                                type="email"
                                placeholder="Enter your email address."
                                value={email}
                                onChange={this.handleChange}
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </Form.Group>
                            <Form.Group>
                                <MainLabel>Password</MainLabel>
                                <Form.Control
                                    name="password"
                                    className={classnames({ "is-invalid" : errors.password })}
                                    type="password"
                                    placeholder="Enter your password."
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </Form.Group>
                            <ButtonWrapper>
                                <Button variant="primary" type="submit" disabled={isInvalid}>Submit</Button>
                            </ButtonWrapper>
                        </Form>
                    </Card>
                </FormWrapper>
            </Wrapper>

            /* <div>
                <a className="forgotPass" href="/login/recovery">Forgot Password?</a>
            </div> */
             
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