import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';

class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            currentPass : '',
            newPass : '',
            confirmPass : ''
        }

        this.handleCurrentPassChange = this.handleCurrentPassChange.bind(this);
        this.handleNewPassChange = this.handleNewPassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);

    }

    handleCurrentPassChange(e) {
        this.setState({ currentPass : e.target.value })
    };

    handleNewPassChange(e) {
        this.setState({ newPass : e.target.value })
    };

    handleConfirmPassChange(e) {
        this.setState({ confirmPass : e.target.value })
    }
 
    render() { 
        return (  
            <form className="container">
                <div className="form">
                    <FormControl id="currentPass" isRequired>
                        <FormLabel>Enter your current password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Enter your current password" 
                            onChange={this.handleCurrentPassChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="newPass" isRequired>
                        <FormLabel>Enter a new password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Enter a new password" 
                            onChange={this.handleNewPassChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmPass" isRequired>
                        <FormLabel>Confirm your new password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Confirm your new password" 
                            onChange={this.handleConfirmPassChange}
                        />
                    </FormControl>
                </div>
                <Button>Save</Button>
            </form>
        );
    }
}
 
export default ChangePass;