const Validator = require('validator');
const isEmpty = require('./isEmpty');

modules.exports = function validateLoginInput(data) {
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email errors

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid."
    };

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required."
    };

    // Password errors

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required."
    };

    return {
        errors : errors,
        isValid : isEmpty(errors)
    };
};