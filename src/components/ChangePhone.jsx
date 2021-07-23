import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Select
} from '@chakra-ui/react';

class ChangePhone extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            newPhoneNum: ''
        }
        this.handleNewPhoneNumChange = this.handleNewPhoneNumChange.bind(this);
    }

    handleNewPhoneNumChange(e) {
        this.setState({ newPhoneNum : e.target.value })
    };

    render() { 
        return (  
            <form className="container">
                <div className="form">
                    <FormControl id="newPhoneNum" isRequired>
                        <p>Current Phone number: xyz</p>
                        {/* add select drop down for area code? */}
                        <FormLabel>Change your phone number</FormLabel>
                        <Input 
                            type="number" 
                            placeholder="Enter a new phone number" 
                            onChange={this.handleNewPhoneNumChange}
                        />
                        <Button>Save</Button>
                    </FormControl>
                </div>
                
            </form>
        );
    }
}
 
export default ChangePhone;