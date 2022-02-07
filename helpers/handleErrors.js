const handleErrors = (err, route) => {
    let errors = route === 'signup' ? { first_name: '', last_name: '', email: '', password: '' }
        : { email: '', password: '' }

    // incorrect email on login
    if(route === 'login' && err.message === 'incorrect email') {
        errors.email = 'Email format is incorrect'
    }

    // incorrect password on login
    if(route === 'login' && err.message === 'incorrect password') {
        errors.password = 'Password don\'t match'
    }

    if (err.code === 11000) {
        errors.email = 'Email is already in use'
        return errors
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        })
    }
    
    return errors
}

module.exports = handleErrors