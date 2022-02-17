const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const entriesRoutes = require("./routes/entriesRoute")
const authRoutes = require("./routes/authRoute")
const {requireAuth, checkUser} = require("./middleware/authMiddleware")

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
app.get('*', checkUser)
app.get('/', checkUser, (req, res) => res.render('index'))
app.get('/search', requireAuth, (req, res) => res.render('search/search'))

app.use(entriesRoutes)
app.use(authRoutes)

app.use(function(req, res){
    res.status(404).render('404');
});



