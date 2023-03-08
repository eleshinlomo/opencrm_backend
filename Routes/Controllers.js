const express = require('express')
const User  = require('../models/user')
const bcrypt = require('bcrypt')
const middleware = require('../middleware')


exports.createUser = (middleware.registerAuth,(req, res)=>{
    const {email, firstname, lastname, password} = req.body
    const user = new User(req.body)
    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(user.password, salt, (err, hash)=>{

        if(err) throw err;
        user.password = hash;
        user.save()
        .then((result)=>{
            res.status(200).send("Now sent")
            
        })
}))
  }) 

  exports.getDashboard = (req, res)=>{
    User.find().sort({Posted: -1})
    .then((data)=>{
        if(!data){
            console.log("no data found")
        }else{
           return res.json(data)
        }
    })
    .then((result)=>{
        console.log(result)
    })
  }
    
    
    
    

    
    





exports.getHome = (req, res)=>{
    res.send("This is a test to homepage on server side")
}