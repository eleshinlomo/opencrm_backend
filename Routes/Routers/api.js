const express = require(express)
const router = express.Router()
const controller = require('../Controllers')


router.post('/addUser', controller.createUser)


module.exports = router