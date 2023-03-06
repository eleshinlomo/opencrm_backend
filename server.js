const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3500


app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("Server is now live and sending messages")
})

app.listen(PORT, ()=>console.log(`Server is now running on ${PORT}`))