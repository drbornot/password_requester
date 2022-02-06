const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const entriesRoutes = require("./routes/entriesRoute")
const authRoutes = require("./routes/authRoute")

dotenv.config()

const dbUDRI = process.env.CONNSTRING
const port = process.env.CONNPORT

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

mongoose.connect(dbUDRI)
    .then((result) => {
        app.listen(port)
        console.log(`Connected to MongoDB by port ${port}`)
    })     
    .catch((error) => console.log(error))

// routes
app.get('/', (req, res) => res.render('index', { user: [] }))
app.get('/search', (req, res) => res.render('search', { user: [] }))

app.use(entriesRoutes)
app.use(authRoutes)



