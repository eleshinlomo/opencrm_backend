const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(cors({
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true 
}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    }))
app.use(express.urlencoded({extended: false}))


app.use('/api', require('./Routes/Routers/api'))




mongoose.connect(process.env.dbURI3, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(PORT, ()=>console.log(`Server and Database now connected on ${PORT}`)))
.catch((err)=>console.log('database not connected'))