import React, { Component } from 'react';
import firebase from 'firebase';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            counter : 5
        }
        this.countdown = this.countdown.bind(this);
    }

    autoSignOut(e) {
        e.preventDefault();
        firebase.auth().signOut();
        console.log("log out successful");
    }

    // needs optimizing
    
    // countdown() {
    //     if (this.state.counter > 0) {
    //         let timer = setInterval(() => this.setState({ counter : this.state.counter - 1 }), 1000)
    //         setTimeout(() => clearInterval(timer), 5000)
    //         // hard refresh
    //         setTimeout(() => window.location = '/', 5000)
    //     } 
    // };

    render() { 
        return (  
            <div>
                <h1>You have successfully signed out from your account!</h1>
                {/* {this.countdown()} */}
                <h2>Automatically redirecting to the home page in {this.state.counter} seconds.</h2>


                <p>This is the landing page for when logged out and will perform a timer before automatically redirecting to home component.</p>
                <p>include a timer state and show changes counting down</p>

            </div>
        );
    }
}
 
export default Logout;