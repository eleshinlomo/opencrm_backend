const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3500


app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({extended: false}))

app.use('/', require('./Routes/Routers/homeRoute'))
app.use('/api', require('./Routes/Routers/api'))




app.listen(PORT, ()=>console.log(`Server is now running on ${PORT}`))