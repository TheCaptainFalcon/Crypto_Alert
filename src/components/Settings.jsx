import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalOverlay,
    ModalFooter,

  } from "@chakra-ui/react"
import './css/Settings.css'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // where to enter functions to bind
        this.emailPressed = this.emailPressed.bind(this);
        this.passPressed = this.passPressed.bind(this);
        this.phonePressed = this.phonePressed.bind(this);
        this.deletePressed = this.deletePressed.bind(this);
        // this.deleteModal = this.deleteModal.bind(this);
        
    };

    // filler code until refactor to hooks
    // deleteModal() {
    //     const { isOpen, onOpen, onClose } = useDisclosure()
      
    //     return (
    //       <>
    //         <Button onClick={onOpen}>Open Modal</Button>
      
    //         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
    //           <ModalOverlay />
    //           <ModalContent>
    //             <ModalHeader>Are you sure you want to delete your account?</ModalHeader>
    //             <ModalCloseButton />
    //             <ModalBody pb={6}>
    //               <p>Deleting your account is irreversible!</p>
    //               <p>Press confirm to continue, otherwise exit to go back.</p>
    //             </ModalBody>
      
    //             <ModalFooter>
    //               <Button colorScheme="blue" mr={3}>
    //                 Confirm
    //               </Button>
    //               <Button onClick={onClose}>Cancel</Button>
    //             </ModalFooter>
    //           </ModalContent>
    //         </Modal>
    //       </>
    //     )
    //   }

    emailPressed() {
        console.log('email has been pressed')
        this.props.history.push('/settings/email');
        // test 
        console.log(this.props)
    }

    passPressed() {
        console.log('password has been pressed')
        this.props.history.push('/settings/password')
    }

    phonePressed() {
        console.log('phone has been pressed')
        this.props.history.push('/settings/phone')
    }

    deletePressed() {
        console.log('delete has been pressed')
        // filler until modal confirmed
        // this.deleteModal();
    }
    
    render() {

        return (
            <div className="container">
                <div className="emailBox">
                    <Button className='button' onClick={this.emailPressed}>Change Email</Button>
                </div>
                <div className="passBox">
                    <Button className='button' onClick={this.passPressed}>Change Password</Button>
                </div>
                <div className="phoneBox">
                    <Button className='button' onClick={this.phonePressed}>Update Phone number</Button>
                </div>
                <div className="deleteBox">
                    <Button onClick={this.deletePressed}>Delete Account</Button>
                </div>
            </div>
       )
    }
}

export default Settings;