const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    // may or may not be required; can be used in different input
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    // Username errors

    if (!Validator.isLength(data.username, { min: 6, max: 15 })) {
        errors.username = "Username must be between 6 and 15 characters."
    };

    if(Validator.isEmpty(data.username)) {
        errors.username = "Username field is required."
    };

    // Password errors

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required."
    };

    if (!Validator.isLength(data.password, { min: 6, max: 25 })) {
        errors.password = "Password must be between 6 and 25 characters."
    };

    // Confirm Password error

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match."
    };

    // Email errors

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required."
    };

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid."
    };

    // Phone errors

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone number field is required."
    };

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone= "Phone number is invalid."
    };

    return {
        errors : errors,
        isValid : isEmpty(errors)
    };
}; 