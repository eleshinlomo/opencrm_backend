const express = require('express')
const router = express.Router()
const controller = require('../Controllers')
const User = require('../../models/user')


// Get Apis
router.get('/dashboard', controller.getDashboard)


// Post Apis
router.post('/addUser/', controller.createUser)


module.exports = router