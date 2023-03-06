const express = require('express')
const User  = require('../models/user')
const bcrypt = require('bcrypt')


exports.createUser = (req, res)=>{
    const {email, firstname, lastname, password} = req.body
    const user = new User(req.body)
    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(user.password, salt, (err, hash)=>{

        if(err) throw err;
        user.password = hash;
        user.save()
        .then((result)=>{
            res.status(200).json()
            
        })
}))
  }  
    
    
    
    

    
    





exports.getHome = (req, res)=>{
    res.send("This is a test to homepage on server side")
}