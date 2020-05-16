const Validator = require ('validator');
const isEmpty  = require ('is-Empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

//email varification    
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "provide correct email ID";
    }

//password varification
    if (Validator.isEmpty(data.password)) {
        errors.password = "password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

//module.exports = validateRegisterInput(data);

