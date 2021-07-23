import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button

} from '@chakra-ui/react';

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            email : ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange(e) {
        this.setState({
            email : e.target.value
        })
    };

    render() { 
        return (  
            <form className="container">
                <h1 class="title">Password Recovery</h1>
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
                <Button>Submit</Button>
                {/* modal with status update of new email being sent and automatic redirect function */}
            </form>
        );
    }
}
 
export default ForgotPass;