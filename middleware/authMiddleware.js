const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("../models/users")

dotenv.config()

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    const key = process.env.JWTSECRETKEY
    
    // check jsonwebtoken exist & verified
    if (token) {
        jwt.verify(token, key, (error, decodedToken) => {
            if(error) {
                console.log(error.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    const key = process.env.JWTSECRETKEY

    if (token) {
        jwt.verify(token, key, async (error, decodedToken) => {
            if(error) {
                console.log(error.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = {
    requireAuth,
    checkUser
}