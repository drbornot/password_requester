
const Entry = require("../models/entries")
const cryptoController = require("../controllers/cryptoController")

getEntries = async (req, res) => {
    
    // const filter = req.body
    const entries = await Entry.find()

    res.status(200).json({ entries })
}

registerEntry = async (req, res) => {

    const { acronym, website, username, owner } = req.body
    
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
    const entry = await Entry.findById(id)
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
    await Entry.findByIdAndDelete(id)
        .then(result => {
            res.status(201).json({ redirect: '/entries' })
        })
        .catch((error) => res.status(400).json({ error: error }))
}

entriesByAcronym = async (req, res) => {

    const acronym = req.params.acronym

    await Entry.find({ acronym: { $regex: acronym } })
        .then(result => {
            res.status(200).json({ entries: result })
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    getEntries,
    registerEntry,
    getEntry,
    deleteEntry,
    entriesByAcronym
}