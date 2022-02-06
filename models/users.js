const mongoose = require("mongoose")
const {required} = require("nodemon/lib/config")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: false
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User