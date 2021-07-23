import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            email : '',
            confirmEmail : ''
        }
        // where to enter functions to bind
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    };

    handleConfirmEmailChange(e) {
        this.setState({ confirmEmail: e.target.value })
    };

    handleSubmit(e) {
        e.preventDefault();
        alert(`${this.state.email} + has been changed!`)
    }

    render() { 
        return (  
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form">
                    <FormControl id="email" isRequired>
                        <FormLabel>Change email address</FormLabel>
                        <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            onChange={this.handleEmailChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmEmail" isRequired>
                        <FormLabel>Confirm change to email address</FormLabel>
                        <Input 
                            type="email" 
                            placeholder="Reenter your email address" 
                            onChange={this.handleConfirmEmailChange}
                        />
                    </FormControl>
                </div>
                <Button>Save</Button>
            </form>
        );
    }
}
 
export default ChangeEmail;