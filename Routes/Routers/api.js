const express = require('express')
const router = express.Router()
const controller = require('../Controllers')
const User = require('../../models/user')

router.post('/addUser/', controller.createUser)


module.exports = router