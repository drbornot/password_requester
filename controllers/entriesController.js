
const Entry = require("../models/entries")
const cryptoController = require("../controllers/cryptoController")
const jwt = require("jsonwebtoken")
const User = require("../models/users")
const dotenv = require("dotenv")

dotenv.config()

getAuthenticatedUser = (value) => {
    const token = value
    const key = process.env.JWTSECRETKEY

    let user
    if (token) {
        user = jwt.verify(token, key)
    } else {
        throw Error("Any token was provide from JWT")
    }

    return user.id
}

getEntries = async (req, res) => {

    const owner = getAuthenticatedUser(req.cookies.jwt)
    
    // const filter = req.body
    const entries = await Entry.find({'owner': owner})

    res.status(200).json({ entries })
}

registerEntry = async (req, res) => {

    const { acronym, username, website } = req.body
    
    const owner = getAuthenticatedUser(req.cookies.jwt)
    
    const password = await cryptoController.encrypt(req.body.password)
    
    try {
        const entry = await Entry.create({ acronym, website, username, password, owner })
        res.status(201).json({ entry: entry._id })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
}

getEntry = async (req, res) => {

    const id = req.params.id

    const owner = getAuthenticatedUser(req.cookies.jwt)

    const entry = await Entry.findById({ _id: id, owner: owner })
        .then(async (entry) => {
            const encryptedData = entry.password
            
            const decrypted = await cryptoController.decrypt(encryptedData)
 
            res.status(200).json({ data: entry })
        })
        .catch((error) => {
            console.log(`Emitted error on: ${error}`)
        })
}

deleteEntry = async (req, res) => {

    const id = req.params.id

    const owner = getAuthenticatedUser(req.cookies.jwt)

    await Entry.findByIdAndDelete({ _id: id, owner: owner })
        .then(result => {
            res.status(201).json({ entry: result._id })
        })
        .catch((error) => res.status(400).json({ error: error }))
}

entriesByAcronym = async (req, res) => {

    const acronym = req.params.acronym

    const owner = getAuthenticatedUser(req.cookies.jwt)

    await Entry.find({ acronym: { $regex: new RegExp('^' + acronym, "i") }, owner: owner})
        .then(result => {
            res.status(200).json({ entries: result })
        })
        .catch(error => {
            console.log(error)
        })
}

protectedPassword = async (req, res) => {

    const id = req.params.id

    const owner = getAuthenticatedUser(req.cookies.jwt)

    await Entry.findById({ _id: id, owner: owner })
        .then(async (entry) => {
            const password = await cryptoController.decrypt(entry.password)
            res.status(200).json({password})
        })
        .catch(err => {
            console.log(err)
            res.status("400").json({ err })
        })
}

module.exports = {
    getEntries,
    registerEntry,
    getEntry,
    deleteEntry,
    entriesByAcronym,
    protectedPassword
}