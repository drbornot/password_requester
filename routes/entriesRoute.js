const { Router } = require("express")
const router = Router()

const entriesController = require("../controllers/entriesController")

router.get('/entries', entriesController.getEntries)

router.post('/entries', entriesController.registerEntry)

router.get('/entries/:id', entriesController.getEntry)

router.delete('/entries/:id', entriesController.deleteEntry)

router.get('/entries/acronym/:acronym', entriesController.entriesByAcronym)

module.exports = router

