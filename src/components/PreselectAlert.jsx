import React, { Component } from 'react';
import { Select } from '@chakra-ui/react';

class PreselectAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            exchange : '',
            exchangeSelected : false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            exchange : e.target.value,
            // exchangeSelected : true
        })
    };
    
    

    render() { 
        // if (this.state.exchangeSelected === true) {

        // }

        return (  
            <div>
                <Select 
                    // value={this.state.exchange} 
                    // onChange={this.handleChange} 
                    placeholder="Select an Exchange">
                        <option value="Binance">Binance</option>
                        <option value="Binance.us">Binance.us</option>
                        <option value="Coinbase">Coinbase</option>
                        <option value="Kraken">Kraken</option>
                        <option value="Gemini">Gemini</option>
                        {/* for now... */}
                </Select>

                <Select placeholder="Select a Coin/Token">
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="ADA">Cardano (ADA)</option>
                    <option value="ENJ">Enjin (ENJ)</option>
                    <option value="XRP">Ripple (XRP)</option>
                    <option value="XLM">Stellar-Lumens (XLM)</option>
                    <option value="LTC">Litecoin (LTC)</option>
                    <option value="DOGE">Dogecoin (DOGE)</option>
                </Select>
                {/* conditional to show options when picking exchange vs coin */}
                {/* conditional - set state to disabled and then enable when an option is selected to open other select */}

                <Select placeholder="Select an alert type">
                    <option value="Price">Price</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Interval">Interval</option>
                    {/* create cooldown and duration as separate small components for reusability?? */}
                </Select>

                <Select placeholder="Specify a cooldown time">
                    <option value="none">None</option>
                    <option value="15mins">15 Minutes</option>
                    <option value="30mins">30 Minutes</option>
                    <option value="1hr">1 Hour</option>
                    <option value="2hrs">2 Hours</option>
                    <option value="3hrs">3 Hours</option>
                    <option value="6hrs">6 Hours</option>
                    <option value="12hrs">12 Hours</option>
                    <option value="24hrs">24 Hours</option>
                </Select>

                <Select placeholder="Specify alert duration">
                    <option value="1hr">1 Hour</option>
                    <option value="3hr">3 Hours</option>
                    <option value="6hr">6 Hours</option>
                    <option value="12hr">12 Hours</option>
                    <option value="24hr">24 Hours</option>
                    <option value="2d">2 Days</option>
                    <option value="5d">5 Days</option>
                    <option value="7d">7 Days</option>
                    <option value="2w">2 Weeks</option>
                    <option value="4w">4 Weeks</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                </Select>
            </div>
        );
    }
}
 
export default PreselectAlert;