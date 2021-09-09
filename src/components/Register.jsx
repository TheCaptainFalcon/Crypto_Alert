import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import './css/Register.css';

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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '', 
            email : '',
            password : '',
            password2: '',
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
        const { name, email, password, password2 } = this.state;
        const newUser = {
            name : name,
            email : email,
            password : password,
            password2 : password2
        }
        this.props.registerUser(newUser, this.props.history);
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/track/alerts');
            // or my alerts route
        };
    };

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.errors) {
    //         this.setState({ errors: nextProps.errors })
    //     }
    // }

    // ADD WHEN WORKING
    componentDidUpdate(prevProps) {
        // use if componentdidmount doesnt comply --
        // if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
        //     this.props.history.push('/track/alerts')
        // }

        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors : this.props.errors
            });
        };
    };

    render() {

        const {
            // user,
            email,
            password,
            password2,
            errors
        } = this.state;

        // could import from validation instead of defining here
        // simple error validation 
        const isInvalid =
            password !== password2 ||
            password === '' ||
            email === '';

        return (
            <Wrapper>
                <FormWrapper>
                    <Card className="card">
                        <CardTitle>Sign Up</CardTitle>
                        <Form className="form" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <MainLabel>Email </MainLabel>
                                <Form.Control 
                                    id="email" 
                                    name="email"
                                    className={classnames({ 'is-invalid' : errors.email })}
                                    value= {email}
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}  
                            </Form.Group>
                            <Form.Group>
                                <MainLabel>Password </MainLabel>
                                <Form.Control
                                    id="password"
                                    name="password"
                                    className={classnames({ 'is-invalid' : errors.password })}
                                    value={password}
                                    type="password" 
                                    placeholder="Enter your password" 
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </Form.Group>
                            <Form.Group>
                                <MainLabel>Confirm Password </MainLabel>
                                <Form.Control
                                    id="password2"
                                    name="password2"
                                    className={classnames({ 'is-invalid' : errors.password2})}
                                    value={password2}
                                    type="password" 
                                    placeholder="Confirm your password" 
                                    onChange={this.handleChange}
                                    required
                                />
                                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                            </Form.Group>
                            <ButtonWrapper>
                                {/* TOS textarea with checkbox - is required */}
                                <Button variant="primary" type="submit" disabled={isInvalid}>Submit</Button>
                            </ButtonWrapper>
         
                        </Form>
                    </Card>
                </FormWrapper>
            </Wrapper>
        )
    }
}

Register.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));