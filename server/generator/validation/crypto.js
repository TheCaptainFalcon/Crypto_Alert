// check valid Ethereum and BSC blockchain addresses

const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCryptoAddress(data) {
    let errors = {};

    data.cryptoAddress = !isEmpty(data.cryptoAddress) ? data.cryptoAddress : '';

    if (Validator.isEmpty(data.cryptoAddress)) {
        errors.cryptoAddress = "Crypto address is required."
    };

    if (!Validator.isEthereumAddress(data.cryptoAddress)) {
        errors.cryptoAddress = "This is not a valid Ethereum address."
    };

    // no native method for BSC - need to create one

    return {
        errors : errors,
        isValid : isEmpty(data)
    };
};