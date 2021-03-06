import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from '@chakra-ui/react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoggedIn : false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.info = this.info.bind(this)
      
    }

    handleLogout() {
        firebase.auth().signOut()
            .then(() => {
                // test dev
                console.log('logged out successfully');
                // this.setState({
                //     user : null
                // })
            })
            .catch((error) => {
                console.log('error', error);
            })
    };

    info() {
        const user = firebase.auth().currentUser;
        console.log(user)
        // console.log(user.uid)
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if(user) {
    //             this.setState({
    //                 isLoggedIn : true
    //             });   
    //         } else {
    //             this.setState({
    //                 isLoggedIn : false
    //             })
                
    //         }
    //     })
    // }

    render() {
        // const isLoggedIn = this.state.isLoggedIn;

        let user = firebase.auth().currentUser;

        if (!user) {
            return (
                <div>
                    hello guest - you must isgn
                    <Button onClick={this.info}>Info</Button>
                </div>
            )
        } else if (user) {
            return (
                <div>
                    hello user 
                    <Button onClick={this.handleLogout}>Log out</Button>
                    <Button onClick={this.info}>Info</Button>
                </div>
            )
        }


        // console.log(this.state.user)
        // if (this.state.user) {
        //     let uid = this.state.user.uid;
            // test dev
            // console.log(uid)
    //         return (
    //             <div>
    //                 <h1>logout here</h1>
    //                 <Button onClick={this.handleLogout}>Log out</Button>
                    
    //             </div>
    //         )
    //     // } else {
    //     //     return (
    //     //         <div>
    //     //             <h1>logout button will populate here</h1>
    //     //             <p>you are not logged in</p>
    //     //         </div> 
            
    //     // }
    // // }
    }
}
    
export default Home;
    
