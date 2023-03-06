const express = require('express')
const router = express.Router()
const controller = require('../Controllers')


router.get('/', controller.getHome)


module.exports = router