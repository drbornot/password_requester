const handleErrors = require("../helpers/handleErrors")
const User = require("../models/users")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const maxAge = 1 * 24 * 60 * 60

const createToken = (id) => {
    const key = process.env.JWTSECRETKEY
    return jwt.sign({ id }, key, {
        expiresIn: maxAge
    })
}

signup_get = (req, res) => {
    res.render("auth/signup")
}

signup_post = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    try {
        const user = await User.create({ first_name, last_name, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'strict', secure: true })
        res.status(201).json({ user: user._id })
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

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'strict', secure: true })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err, 'login')
        res.status(400).json({ errors })
    }
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