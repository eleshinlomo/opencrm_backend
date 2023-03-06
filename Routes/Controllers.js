const express = require('express')
const User  = require('../models/User')


exports.createUser = (req, res)=>{
    const user = new User(req.body)
    console.log(user)
}