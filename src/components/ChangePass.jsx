import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import firebase from 'firebase';

class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            newPass : '',
            confirmPass : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleChange(e) {
        this.setState({ 
            [e.target.name] : e.target.value 
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        const { newPass } = this.state;
        const user = firebase.auth().currentUser;

        user.updatePassword(newPass) 
            .then(() => {
                console.log('password update success!')
            })
            .catch((err) => {
                console.log('error has occurred', err)
            })
    };

    handleGoBack(e) {
        e.preventDefault();
        this.props.history.push('/settings');
    };
 
    render() { 
        const {
            newPass,
            confirmPass
        } = this.state;

        const isInvalid =
            newPass === '' ||
            confirmPass === '' ||
            newPass !== confirmPass; 

        return (  
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form">
                    <FormControl id="newPass" isRequired>
                        <FormLabel>Enter a new password</FormLabel>
                        <Input 
                            name="newPass"
                            type="password" 
                            placeholder="Enter a new password" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <div className="form">
                    <FormControl id="confirmPass" isRequired>
                        <FormLabel>Confirm your new password</FormLabel>
                        <Input 
                            name="confirmPass"
                            type="password" 
                            placeholder="Confirm your new password" 
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                <Button onClick={this.handleGoBack}>Go Back</Button>
                <Button type="submit" disabled={isInvalid}>Save</Button>
            </form>
        );
    }
}
 
export default ChangePass;