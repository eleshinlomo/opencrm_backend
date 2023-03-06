const express = require('express')
const User  = require('../models/User')


exports.createUser = (req, res)=>{
    const user = new User(req.body)
    console.log(user)
}

exports.getHome = (req, res)=>{
    res.send("This is a test to homepage on server side")
}