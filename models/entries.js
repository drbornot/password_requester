const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")

const entrySchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
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

const Entry = mongoose.model("Entry", entrySchema)

module.exports = Entry