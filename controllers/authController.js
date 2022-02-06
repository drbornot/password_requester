const handleErrors = require("../helpers/handleErrors")
const User = require("../models/users")

signup_get = (req, res) => {
    res.render("auth/signup")
}

signup_post = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    try {
        const user = await User.create({ first_name, last_name, email, password })
        res.status(201).json(user)
    } catch(err) {
        const errors = handleErrors(err, 'signup')
        res.status(400).send({ errors })
    }
}

login_get = (req, res) => {
    res.render("auth/login")
}

login_post = async (req, res) => {
    const { email, password } = req.body



    res.send(`Username: ${username}, Password: ${password}`)
}

logout = (req, res) => {
    res.render("logout")
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout
}