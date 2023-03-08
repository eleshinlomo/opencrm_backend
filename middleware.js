const express = require('express')
const User = require('./models/user')

exports.registerAuth = (req, res, next)=>{
    const {email, firstname, lastname, password} = req.body
    User.findOne({email})
    .then((email)=>{
        if(email){
            return res.redirect('/')
        }else{
            next()
        }
    })
} 