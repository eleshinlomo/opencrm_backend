const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500


app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({extended: false}))

app.use('/', require('./Routes/Routers/homeRoute'))
app.use('/api', require('./Routes/Routers/api'))




mongoose.connect(process.env.dbURI3, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(PORT, ()=>console.log(`Server and Database now connected on ${PORT}`)))
.catch((err)=>console.log('database not connected'))