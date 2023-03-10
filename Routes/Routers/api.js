const express = require('express')
const router = express.Router()
const controller = require('../Controllers')
const User = require('../../models/user')




// Get APIs
router.get('/user', controller.getUser)
router.get('/user/:id', controller.getUser)
router.get('/logout', controller.logout);



// Post APIs
router.post('/addUser/', controller.createUser)
router.post('/login', controller.login, controller.loginAuth)

module.exports = router