const express = require('express')
const router = express.Router()
const controller = require('../Controllers')
const User = require('../../models/user')



// Get APIs
router.get('/dashboard', controller.getDashboard)
router.get('/message', controller.message)
router.post('/login', controller.login);


// Post APIs
router.post('/addUser/', controller.createUser)


module.exports = router