const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

//email checks
    
    if(Validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    } else if(!Validator.isEmail(data.email)){
        errors.email = 'email field is not valid';
    }

//password checks

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

//module.exports = validateLoginInput(data);