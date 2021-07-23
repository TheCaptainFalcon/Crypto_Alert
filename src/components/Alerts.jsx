import React, { Component } from 'react';
import PreselectAlert from './PreselectAlert';

class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                this is the alerts page.

                <PreselectAlert/>
            </div>
        );
    }
}
 
export default Alerts;