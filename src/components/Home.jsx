import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from '@chakra-ui/react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : null
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        firebase.auth().signOut()
            .then(() => {
                // test dev
                console.log('logged out successfully');
            })
            .catch((error) => {
                console.log('error', error);
            })
    };

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         this.setState({
    //                 user
    //             })
    //     }
    // )};

    renderContent() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                return (
                    <div>
                        <h1>logout here</h1>
                        <Button onClick={this.handleLogout}>Log out</Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>logout button will populate here</h1>
                        <p>you are not logged in</p>
                    </div>
                )
            }
        })
    }

    render() {
        // console.log(this.state.user)
        // if (this.state.user) {
        //     let uid = this.state.user.uid;
            // test dev
            // console.log(uid)
            return (
                <div>
                    <h1>logout here</h1>
                    <Button onClick={this.handleLogout}>Log out</Button>
                </div>
            )
        // } else {
        //     return (
        //         <div>
        //             <h1>logout button will populate here</h1>
        //             <p>you are not logged in</p>
        //         </div> 
            
        // }
    }
}

export default Home;

